import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TeachersModule } from './teachers.module';
import { TeachersService } from './teachers.service';
import { INestApplication } from '@nestjs/common';
import { mockCreateUserParams } from 'src/users/entities/user.entity';

describe('Teachers End-to-end', () => {
  let app: INestApplication;
  let teachersService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TeachersModule],
    })
      .overrideProvider(TeachersService)
      .useValue(teachersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET teachers`, () => {
    return request(app.getHttpServer())
      .get('/teachers')
      .expect(200)
      .expect(teachersService.findAll());
  });

  it('/POST teacher', (done) => {
      return request(app).post('/teachers')
                .send({ id: 'random-id', registration: 'XXX-EXAMPLE-XXX' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, {
                    id: 'random-id', 
                    registration: 'XXX-EXAMPLE-XXX', 
                    createdAt: new Date(), 
                    updatedAt: new Date() 
                })
                .end(function(err, res) {
                    if (err) return done(err);
                    return done();
                });
  })

  afterAll(async () => {
    await app.close();
  });
});