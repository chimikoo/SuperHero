import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Main application controller.
 * Handles basic root-level API requests.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
