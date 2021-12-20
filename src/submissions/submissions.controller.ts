import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFiles, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';

@ApiTags('Submissions')
@Controller('submissions')
@GlobalResponseSwagger()
@UseGuards(AuthGuard('jwt'))
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
        },
        mentorshipId: {
          type: 'string'
        },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          }
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Roles(Role.Student)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createSubmissionDto: CreateSubmissionDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.submissionsService.create(createSubmissionDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.submissionsService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a submission by id' })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  update(@Param('id') id: number, @Body() updateSubmissionDto: UpdateSubmissionDto, @UploadedFiles() files?: Express.Multer.File[]) {
    return this.submissionsService.update(+id, updateSubmissionDto, files);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a submission by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.submissionsService.remove(+id);
  }
}
