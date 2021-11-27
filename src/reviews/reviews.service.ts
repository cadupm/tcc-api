import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly submissionsService: SubmissionsService
  ) {}
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { submissionId } = createReviewDto

    const existentSubmission = await this.submissionsService.findOne(submissionId)

    if(!existentSubmission) throw new NotFoundException('Submissão não encontrada!')

    return this.prisma.review.create({
      data: createReviewDto
    })
  }

  async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany({})
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: {
        id
      }
    })

    if(!review) throw new NotFoundException('Revisão não encontrada!')

    return review
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    await this.findOne(id)

    return this.prisma.review.update({
      where: {
        id
      },
      data: updateReviewDto
    })
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)

    await this.prisma.review.delete({
      where: {
        id
      }
    })
  }
}
