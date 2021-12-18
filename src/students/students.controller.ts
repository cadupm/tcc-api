import { Controller, Get, Post, Body, Put, Param, Query, Delete, HttpCode, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags,  } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';
import { ListStudentDto } from './dto/list-student-dto';

@ApiTags('Students')
@Controller('students')
@GlobalResponseSwagger()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students using filters or do not' })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listStudentDto: ListStudentDto) {
    return this.studentsService.findAll(listStudentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Put(':id')
  @ApiOperation({ summary: 'Update student by id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) 
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: false,
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        registration: {
          type: 'string',
        },
        expertise: {
          type: 'string',
        },
        bio: {
          type: 'string',
        },
        gitHubLink: {
          type: 'string',
        },
        linkedinLink: {
          type: 'string',
        },
        contact: {
          type: 'string',
        },
        profileImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  }) 
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('profileImage'))
  update(@Param('id') id?: string, @Body() updateStudentDto?: Omit <UpdateStudentDto, 'profileImage'>, @UploadedFile() file?: Express.Multer.File) {
    return this.studentsService.update(id, updateStudentDto, file);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Remove student by id' })
  @Roles(Role.Student)
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
