import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SubmissionsModule } from './submissions.module';
import { SubmissionsService } from './submissions.service';
import { INestApplication } from '@nestjs/common';
import { mockCreateUserParams } from 'src/users/entities/user.entity';

describe('Submissions End-to-end', () => {
  let app: INestApplication;
  let submissionsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SubmissionsModule],
    })
      .overrideProvider(SubmissionsService)
      .useValue(submissionsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Submissions`, () => {
    return request(app.getHttpServer())
      .get('/Submissions')
      .expect(200)
      .expect(submissionsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});