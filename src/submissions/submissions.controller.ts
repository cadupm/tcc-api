import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFiles, HttpCode, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('submissions')
@UseGuards(AuthGuard('jwt'))
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Student)
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

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto, @UploadedFiles() files?: Express.Multer.File[]) {
    return this.submissionsService.update(+id, updateSubmissionDto, files);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(+id);
  }
}
