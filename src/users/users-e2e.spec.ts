import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { INestApplication } from '@nestjs/common';

describe('users', () => {
  let app: INestApplication;
  let usersService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});