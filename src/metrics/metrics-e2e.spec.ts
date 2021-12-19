import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MetricsModule } from './metrics.module';
import { MetricsService } from './metrics.service';
import { INestApplication } from '@nestjs/common';
// import { mockCreateUserParams } from 'src/users/entities/user.entity';

describe('Metrics End-to-end', () => {
  let app: INestApplication;
  let metricsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MetricsModule],
    })
      .overrideProvider(MetricsService)
      .useValue(metricsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Metrics`, () => {
    return request(app.getHttpServer())
      .get('/Metrics')
      .expect(200)
      .expect(metricsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});