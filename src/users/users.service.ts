import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto
    })

    return user
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({})
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ 
      where: {
        id
    }});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto
    })
  }

  async remove(id: string): Promise<unknown> {
    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }
}
