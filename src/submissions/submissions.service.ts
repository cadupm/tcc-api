import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';
import { MentorshipsService } from 'src/mentorships/mentorships.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mentorshipsService: MentorshipsService,
    private readonly filesService: FilesService
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto, files: Express.Multer.File[]) {
    const { mentorshipId } = createSubmissionDto
    
    const existentMentorship = await this.mentorshipsService.findOne(mentorshipId)

    if(existentMentorship.isInvitationAccepted === 'accepted') {
      const filesUrl = await Promise.all(
        files.map(async (file) => this.filesService.uploadFile(existentMentorship.id, { path: file.originalname, buffer: file.buffer, mimetype: file.mimetype }, 'files')))

      return this.prisma.submission.create({
          data: {...createSubmissionDto, filesUrl }
      })
    }
    
    throw new BadRequestException('Seu convite de orientação não foi aceito!')
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

  async update(id: number, updateSubmissionDto: UpdateSubmissionDto, files?: Express.Multer.File[]) {
    const existentMentorship = await this.findOne(id)

    let newFilesUrl = []
    if(files) {
      if(existentMentorship.filesUrl.length) {
        files.map(async(_, index) => this.filesService.removeFile(existentMentorship.filesUrl[index]))
      }
      newFilesUrl = await Promise.all(files.map(async(file) => this.filesService.uploadFile(String(existentMentorship.id), { path: file.originalname, buffer: file.buffer, mimetype: file.mimetype }, 'files')))
    }

    return this.prisma.submission.update({
      where: {
        id
      },
      data: {...updateSubmissionDto, filesUrl: newFilesUrl }
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
