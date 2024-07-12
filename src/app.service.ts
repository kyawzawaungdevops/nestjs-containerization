import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
  ) {}

  getHealth(): Promise<HealthCheckResult> {
    return this.health.check([async () => this.mongoose.pingCheck('mongodb')]);
  }
}
