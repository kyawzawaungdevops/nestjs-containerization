import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HealthCheck()
  getHello() {
    return this.appService.getHealth();
  }
}
