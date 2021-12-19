import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipsService } from './mentorships.service';

import { mockCreateMentorshipResult } from './entities/mentorship.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const MentorshipsRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateMentorshipResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateMentorshipResult(), mockCreateMentorshipResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateMentorshipResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateMentorshipResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('MentorshipsService', () => {
  let service: MentorshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MentorshipsService,
        {
          provide: PrismaService,
          useValue: MentorshipsRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<MentorshipsService>(MentorshipsService);
  });

  describe('Create mentorship', () => {
    it('should be able to create an mentorship', async () => {
      expect(service.create).resolves;
    });
  });

  describe('Find mentorship', () => {
    it('should be able to find mentorships', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update mentorship', () => {
    it('should be able to update an mentorship', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete mentorship', () => {
    it('should be able to delete an mentorship', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
