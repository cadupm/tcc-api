import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipsService } from './mentorships.service';

describe('MentorshipsService', () => {
  let service: MentorshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentorshipsService],
    }).compile();

    service = module.get<MentorshipsService>(MentorshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
