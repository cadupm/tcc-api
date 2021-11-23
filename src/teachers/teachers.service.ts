import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { name, email, password, registration } = createTeacherDto

    const [existentUser] = await this.usersService.findAll(email)

    if(existentUser) throw new BadRequestException('Professor já cadastrado!')
    
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    const teacher = await this.prisma.teacher.create({
      data: {
        userId: user.id,
        registration
      }
    })

    return teacher
  }

  async findAll(): Promise<Teacher[]> {
    return this.prisma.teacher.findMany({
      include: {
        user: true
      }
    });
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      include: {
        user: true
      }, 
      where: {
        id
    }});

    if(!teacher) throw new NotFoundException('Professor não cadastrado!')

    return teacher
  }

  async update(id: string, updateteacherDto: UpdateTeacherDto): Promise<Teacher> {
    const { registration, ...rest } = updateteacherDto
    const { email } = rest

    const teacherInfo = await this.findOne(id)

    const [existentTeacherWithEmail] = await this.usersService.findAll(email)

    if(existentTeacherWithEmail) throw new BadRequestException('Professor com email já cadastrado')

    await this.usersService.update(teacherInfo.id, rest)
    
    return this.prisma.teacher.update({
      where: {
        id
      },
      data: { 
        registration
      }
    })
  }

  async remove(id: string): Promise<unknown> {
    await this.findOne(id)
    
    return this.prisma.teacher.delete({
      where: {
        id
      }
    });
  }
}
