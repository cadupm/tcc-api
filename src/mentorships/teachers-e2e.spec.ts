import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MentorshipsModule } from './mentorships.module';
import { MentorshipsService } from './mentorships.service';
import { INestApplication } from '@nestjs/common';

describe('Mentorships End-to-end', () => {
  let app: INestApplication;
  let mentorshipsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MentorshipsModule],
    })
      .overrideProvider(MentorshipsService)
      .useValue(mentorshipsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Mentorships`, () => {
    return request(app.getHttpServer())
      .get('/Mentorships')
      .expect(200)
      .expect(mentorshipsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});