import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ReviewsModule } from './reviews.module';
import { ReviewsService } from './reviews.service';
import { INestApplication } from '@nestjs/common';
import { mockCreateUserParams } from 'src/users/entities/user.entity';

describe('Reviews End-to-end', () => {
  let app: INestApplication;
  let reviewsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ReviewsModule],
    })
      .overrideProvider(ReviewsService)
      .useValue(reviewsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Reviews`, () => {
    return request(app.getHttpServer())
      .get('/Reviews')
      .expect(200)
      .expect(reviewsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});