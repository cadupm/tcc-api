import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsertDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto

    const [existentUser] = await this.findAll({ email })

    if(existentUser) throw new BadRequestException('Usuário já cadastrado!')
    
    const user = await this.prisma.user.create({
      data: createUserDto
    })

    return user
  }

  async findAll(listUserDto: ListUsertDto): Promise<User[]> {
    const { name, email } = listUserDto
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
        email: {
          contains: email
        }
      }
    })

    return users
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
