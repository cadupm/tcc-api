import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { Metric } from './entities/metric.entity';

@Injectable()
export class MetricsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reviewsService: ReviewsService
  ) {}

  async create(createMetricDto: CreateMetricDto): Promise<Metric> {
    const { reviewId } = createMetricDto

    const existentReview = await this.reviewsService.findOne(reviewId)

    if(!existentReview) throw new NotFoundException('Revisão não encontrada!')

    return this.prisma.metric.create({
      data: createMetricDto
    })
  }

  async findAll(): Promise<Metric[]> {
    return this.prisma.metric.findMany({})
  }

  async findOne(id: number) {
    const metric = await this.prisma.metric.findUnique({
      where: {
        id
      }
    })

    if(!metric) throw new NotFoundException('Métrica não encontrada!')

    return metric
  }

  async update(id: number, updateMetricDto: UpdateMetricDto): Promise<Metric> {
    await this.findOne(id)

    return this.prisma.metric.update({
      where: {
        id
      },
      data: updateMetricDto
    })
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)

    await this.prisma.metric.delete({
      where: {
        id
      }
    })
  }
}
