import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { ListMentorshipDto } from './dto/list-mentorship.dto';
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
   
    const existentStudent = await this.studentsService.findOne(studentId)
    
    await this.teachersService.findOne(teacherId)

    const [existentMentorship] = await this.findAll({ studentId: existentStudent.id })

    if(existentMentorship) throw new BadRequestException('Você já tem uma orientação marcada. Por favor, cancele a anterior caso deseja efetuar um novo convite!')

    return this.prisma.mentorship.create({
      data: createMentorshipDto
    })
  }

  async findAll(listMentorshipDto: ListMentorshipDto): Promise<Mentorship[]> {
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
      where: listMentorshipDto
    });
  }

  async findOne(id: string): Promise<Mentorship> {
    const mentorship = await this.prisma.mentorship.findUnique({
      include: {
        student: true,
        teacher: true,
      },
      where: {
        id
      }
    });

    if(!mentorship) throw new NotFoundException('Mentoria não cadastrada!')

    return mentorship
  }

  async update(id: string, updateMentorshipDto: UpdateMentorshipDto): Promise<Mentorship> {
    const { isInvitationAccepted } = updateMentorshipDto

    await this.findOne(id)

    if(isInvitationAccepted === 'refused') return this.remove(id)
    
    return this.prisma.mentorship.update({
      where: {
        id
      },
      data: updateMentorshipDto
    })
  }

  async remove(id: string): Promise<Mentorship> {
    await this.findOne(id) 

    return this.prisma.mentorship.delete({
      where: {
        id
      }
    })
  }
}
