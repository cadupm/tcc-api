import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mentorshipsService: MentorshipsService
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto) {
    const { mentorshipId } = createSubmissionDto
    
    await this.mentorshipsService.findOne(mentorshipId)

    return this.prisma.submission.create({
      data: createSubmissionDto
    })
  }

  async findAll() {
    return this.prisma.submission.findMany({});
  }

  async findOne(id: number) {
    const submission = await this.prisma.submission.findUnique({
      where: {
        id
      }
    });

    if(!submission) throw new NotFoundException('Submissão não encontrada!')

    return submission
  }

  async update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    await this.findOne(id)

    return this.prisma.submission.update({
      where: {
        id
      },
      data: updateSubmissionDto
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    return this.prisma.submission.delete({
      where: {
        id
      }
    })
  }
}
