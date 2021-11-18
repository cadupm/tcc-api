import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = await this.prisma.student.create({
      data: createStudentDto
    })

    return student
  }

  async findAll(): Promise<Student[]> {
    return this.prisma.student.findMany({});
  }

  async findOne(id: string) {
    return this.prisma.student.findUnique({ 
      where: {
        id
    }});
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.prisma.student.update({
      where: {
        id
      },
      data: updateStudentDto
    })
  }

  async remove(id: string): Promise<unknown> {
    return this.prisma.student.delete({
      where: {
        id
      }
    });
  }
}
