import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseGuards, Put, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { ListReviewDto } from './dto/list-review.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';

@ApiTags('Reviews')
@Controller('reviews')
@GlobalResponseSwagger()
@UseGuards(AuthGuard('jwt'))
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a review using filter or do not' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listReviewDto: ListReviewDto) {
    return this.reviewsService.findAll(listReviewDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Put(':id')
  @ApiOperation({ summary: 'Update a review by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a review by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
