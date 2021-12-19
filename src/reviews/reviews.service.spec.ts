import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';

import { mockCreateReviewResult } from './entities/review.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const ReviewsRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateReviewResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateReviewResult(), mockCreateReviewResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateReviewResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateReviewResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: PrismaService,
          useValue: ReviewsRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  describe('Create review', () => {
    it('should be able to create a review', async () => {
      expect(service.create).resolves;
    });
  });

  describe('Find review', () => {
    it('should be able to find reviews', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update review', () => {
    it('should be able to update a review', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete review', () => {
    it('should be able to delete a review', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
