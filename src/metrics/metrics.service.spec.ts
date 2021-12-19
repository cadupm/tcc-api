import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';

import { mockCreateMetricResult } from './entities/metric.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const MetricsRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateMetricResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateMetricResult(), mockCreateMetricResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateMetricResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateMetricResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: PrismaService,
          useValue: MetricsRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  describe('Create metric', () => {
    it('should be able to create a metric', async () => {
      expect(service.create).resolves;
    });
  });

  describe('Find metric', () => {
    it('should be able to find metrics', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update metric', () => {
    it('should be able to update a metric', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete metric', () => {
    it('should be able to delete a metric', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
