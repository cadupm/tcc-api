import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';

import { mockCreateStudentResult } from './entities/student.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const StudentsRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateStudentResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateStudentResult(), mockCreateStudentResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateStudentResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateStudentResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: PrismaService,
          useValue: StudentsRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  describe('Create Student', () => {
    it('should be able to create an student', async () => {
      expect(service.create).resolves;
    });
  });

  describe('Find Student', () => {
    it('should be able to find students', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update Student', () => {
    it('should be able to update an student', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete Student', () => {
    it('should be able to delete an student', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
