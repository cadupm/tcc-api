import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { UpdateMentorshipDto } from './dto/update-mentorship.dto';
import { Mentorship } from './entities/mentorship.entity';

@Injectable()
export class MentorshipsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService
  ) {}

  async create(createMentorshipDto: CreateMentorshipDto): Promise<Mentorship> {
    const { studentId, teacherId } = createMentorshipDto
   
    const student = await this.studentsService.findOne(studentId)

    const [existentMentorship] = await this.findAll(student.id)

    if(existentMentorship) throw new Error('Você já tem uma orientação marcada. Por favor, cancele a anterior caso deseja efetuar um novo convite!')

    if(!student) throw new Error('Estudante não cadastrado!')

    const teacher = await this.teachersService.findOne(teacherId)

    if(!teacher) throw new Error('Orientador não cadastrado!')

    return this.prisma.mentorship.create({
      data: createMentorshipDto
    })
  }

  async findAll(studentId?: string): Promise<Mentorship[]> {
    return this.prisma.mentorship.findMany({
      include: {
        student: {
          include: {
            user: true
          }
        },
        teacher: {
          include: {
            user: true
          }
        },
      },
      where: {
        studentId
      }
    });
  }

  async findOne(id: string): Promise<Mentorship> {
    return this.prisma.mentorship.findUnique({
      include: {
        student: true,
        teacher: true,
      },
      where: {
        id
      }
    });
  }

  async update(id: string, updateMentorshipDto: UpdateMentorshipDto) {
    const mentorship = await this.findOne(id)

    if(!mentorship) throw new Error('Mentorship does not exists')

    return this.prisma.mentorship.update({
      where: {
        id
      },
      data: updateMentorshipDto
    })
  }

  async remove(id: string) {
    const mentorship = await this.findOne(id)

    if(!mentorship) throw new Error('Mentorship does not exists')

    return this.prisma.mentorship.delete({
      where: {
        id
      }
    })
  }
}
