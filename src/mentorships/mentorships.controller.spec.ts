import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipsController } from './mentorships.controller';
import { MentorshipsService } from './mentorships.service';

describe('MentorshipsController', () => {
  let controller: MentorshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorshipsController],
      providers: [MentorshipsService],
    }).compile();

    controller = module.get<MentorshipsController>(MentorshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
