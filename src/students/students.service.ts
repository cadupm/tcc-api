import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { name, email, password, registration } = createStudentDto

    const [existentUser] = await this.usersService.findAll(email)

    if(existentUser) throw new BadRequestException('Estudante já cadastrado!')
    
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    const student = await this.prisma.student.create({
      data: {
        userId: user.id,
        registration
      }
    })

    return student
  }

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({
      include: {
        user: true
      }
    });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      include: {
        user: true
      }, 
      where: {
        id
    }});

    if(!student) throw new NotFoundException('Estudante não cadastrado!')

    return student
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const { registration, ...rest } = updateStudentDto

    const studentInfo = await this.findOne(id)

    await this.usersService.update(studentInfo.id, rest)
    
    return this.prisma.student.update({
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

    return this.prisma.student.delete({
      where: {
        id
      }
    });
  }
}
