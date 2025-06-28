import { IsUrl, IsNotEmpty } from 'class-validator';
export class CreateUrlDto {
  @IsNotEmpty()
  @IsUrl({}, { message: 'Please provide a valid URL.' })
  originalUrl: string;
}