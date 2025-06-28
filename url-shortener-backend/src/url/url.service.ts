import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}
  /**
   * Creates a new shortened URL.
   * @param createUrlDto - DTO containing the original URL.
   * @returns The newly created Url entity.
   */
  async createShortUrl(createUrlDto: CreateUrlDto): Promise<Url> {
    const { originalUrl } = createUrlDto;
    
    // Check if the URL has already been shortened
    const existingUrl = await this.urlRepository.findOneBy({ originalUrl });
    if (existingUrl) {
      return existingUrl;
    }
    // Generate a unique slug using a do...while loop to ensure it runs at least once.
    let slug: string;
    let slugExists;
    do {
      slug = nanoid(7); // Generate a 7-character slug
      slugExists = await this.urlRepository.findOneBy({ slug });
    } while (slugExists);
    const newUrl = this.urlRepository.create({
      originalUrl,
      slug,
    });
    return this.urlRepository.save(newUrl);
  }
  /**
   * Finds the original URL for a given slug, increments its visit count, and returns it.
   * @param slug - The unique slug for the URL.
   * @returns The original URL string.
   */
  async findOriginalUrl(slug: string): Promise<string> {
    const url = await this.urlRepository.findOneBy({ slug });
    if (!url) {
      throw new NotFoundException('The requested URL was not found.');
    }
    // Increment visit count asynchronously (fire and forget)
    this.urlRepository.increment({ slug }, 'visits', 1);
    return url.originalUrl;
  }
  /**
   * Finds all shortened URLs.
   * @returns An array of all Url entities.
   */
  async findAll(): Promise<Url[]> {
    return this.urlRepository.find({
        order: {
            createdAt: 'DESC'
        }
    });
  }
}