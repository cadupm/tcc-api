import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFiles, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createSubmissionDto: CreateSubmissionDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.submissionsService.create(createSubmissionDto, files);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto, @UploadedFiles() files?: Express.Multer.File[]) {
    return this.submissionsService.update(+id, updateSubmissionDto, files);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(+id);
  }
}
