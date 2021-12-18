import { Controller, Get, Post, Body, Put, Param, Query, Delete, HttpCode, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags,  } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';
import { ListTeacherDto } from './dto/list-teacher.dto';

@ApiTags('Teachers')
@Controller('teachers')
@GlobalResponseSwagger()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiBody({ type: CreateTeacherDto })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teachers using filters or do not' })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listTeacherDto: ListTeacherDto) {
    return this.teachersService.findAll(listTeacherDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get teacher by id' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Put(':id')
  @ApiOperation({ summary: 'Update teacher by id' })
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
  update(@Param('id') id?: string, @Body() updateTeacherDto?: UpdateTeacherDto, @UploadedFile() file?: Express.Multer.File) {
    return this.teachersService.update(id, updateTeacherDto, file);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Remove teacher by id' })
  @Roles(Role.Teacher)
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
