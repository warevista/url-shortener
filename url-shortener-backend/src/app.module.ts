import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlModule } from './url/url.module';
import { Url } from './url/url.entity';
@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigService available throughout the app
    }),
    // Database Configuration using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Url],
        synchronize: true, // Good for dev, but use migrations in production.
      }),
    }),
    // Rate Limiting Configuration
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    // Import the feature module for URL shortening
    UrlModule,
  ],
  controllers: [],
  providers: [
    // Apply the rate limiter guard globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}