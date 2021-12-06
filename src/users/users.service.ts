import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { email } = createUserDto

    const [existentUser] = await this.findAll(email)

    if(existentUser) throw new BadRequestException('Usuário já cadastrado!')
    
    const user = await this.prisma.user.create({
      data: createUserDto
    })

    return user
  }

  async findAll(email?: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        email
      }
    })

    const modifyUsers = users.map(user => { 
      delete user.password
      return user
  })

    return modifyUsers
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ 
      where: {
        id
    }});

    if(!user) throw new NotFoundException('Usuário não cadastrado!')

    delete user.password

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto
    })
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)
       
    await this.prisma.user.delete({
      where: {
        id: id
    }
  })
  }
}
