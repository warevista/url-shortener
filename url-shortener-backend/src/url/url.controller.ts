import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './url.entity';
@Controller() // Routes will be at the root level, e.g., POST / and GET /:slug
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  /**
   * POST /
   * Endpoint to create a new shortened URL.
   */
  @Post()
  async create(@Body() createUrlDto: CreateUrlDto): Promise<{ shortUrl: string }> {
    const newUrl = await this.urlService.createShortUrl(createUrlDto);
    // You should configure the domain based on your environment
    const shortUrl = `http://localhost:3001/${newUrl.slug}`;
    return { shortUrl };
  }
  /**
   * GET /list
   * Endpoint to retrieve a list of all shortened URLs.
   */
  @Get('list')
  async findAll(): Promise<Url[]> {
    return this.urlService.findAll();
  }
  /**
   * GET /:slug
   * Endpoint to redirect to the original URL.
   * This should be the last route to avoid conflicts with other GET routes like /list.
   */
  @Get(':slug')
  async findOne(@Param('slug') slug: string, @Res() res: Response) {
    try {
        const originalUrl = await this.urlService.findOriginalUrl(slug);
        return res.redirect(HttpStatus.FOUND, originalUrl);
    } catch (error) {
        // If the slug is not found, send a 404 Not Found response
        return res.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }
}