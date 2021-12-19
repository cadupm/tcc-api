import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';

import { mockCreateTeacherResult } from './entities/teacher.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const TeacherRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateTeacherResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateTeacherResult(), mockCreateTeacherResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateTeacherResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateTeacherResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('TeachersService', () => {
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        {
          provide: PrismaService,
          useValue: TeacherRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
  });

  describe('Create teacher', () => {
    it('should be able to create an teacher', async () => {
      expect(service.create).resolves;
    });
  });

  describe('Find teacher', () => {
    it('should be able to find teachers', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update Teacher', () => {
    it('should be able to update an teacher', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete Teacher', () => {
    it('should be able to delete an teacher', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
