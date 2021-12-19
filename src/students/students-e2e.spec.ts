import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StudentsModule } from './students.module';
import { StudentsService } from './students.service';
import { INestApplication } from '@nestjs/common';

describe('Students End-to-end', () => {
  let app: INestApplication;
  let studentsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StudentsModule],
    })
      .overrideProvider(StudentsService)
      .useValue(studentsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Students`, () => {
    return request(app.getHttpServer())
      .get('/Students')
      .expect(200)
      .expect(studentsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});