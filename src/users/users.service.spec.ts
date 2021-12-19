import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { 
  //mockCreateUserParams,
  //mockListUserParams,
  //mockUpdateUserParams,
  mockCreateUserResult } from './entities/user.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';

const UserRepositorySpy = {
  create: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  findAll: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([mockCreateUserResult(), mockCreateUserResult()]),
    ),
  findOne: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  update: jest.fn().mockReturnValue(Promise.resolve(mockCreateUserResult())),
  remove: jest.fn().mockReturnValue(Promise.resolve()) 
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: UserRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('Create user', () => {
    it('should be able to create an user', async () => {
      //const fakeParams = mockCreateUserParams();
      expect(service.create).resolves;
    });
  });

  describe('Find user', () => {
    it('should be able to find users', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
    });
  });

  describe('Update user', () => {
    it('should be able to update an user', () => {
      expect(service.update).toBeDefined();
    });
  });

  describe('Delete user', () => {
    it('should be able to delete an user', () => {
      expect(service.remove).toBeDefined();
    });
  }); 
})
