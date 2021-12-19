import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsService } from './submissions.service';

import { mockCreateSubmissionResult } from './entities/submission.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const SubmissionsRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateSubmissionResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateSubmissionResult(), mockCreateSubmissionResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateSubmissionResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateSubmissionResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('SubmissionsService', () => {
  let service: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionsService,
        {
          provide: PrismaService,
          useValue: SubmissionsRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<SubmissionsService>(SubmissionsService);
  });

  describe('Create submission', () => {
    it('should be able to create a submission', async () => {
      expect(service.create).resolves;
    });
  });

  describe('Find submission', () => {
    it('should be able to find submissions', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update submission', () => {
    it('should be able to update a submission', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete submission', () => {
    it('should be able to delete a submission', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
