import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { MentorshipsService } from './mentorships.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { UpdateMentorshipDto } from './dto/update-mentorship.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { ListMentorshipDto } from './dto/list-mentorship.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';

@ApiTags('Mentorships')
@Controller('mentorships')
@GlobalResponseSwagger()
@UseGuards(AuthGuard('jwt'))
export class MentorshipsController {
  constructor(private readonly mentorshipsService: MentorshipsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  @Post()
  @ApiOperation({ summary: 'Create a new mentorship' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMentorshipDto: CreateMentorshipDto) {
    return this.mentorshipsService.create(createMentorshipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a mentorship using filter or many of them' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listMentorshipDto: ListMentorshipDto) {
    return this.mentorshipsService.findAll(listMentorshipDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Create a mentorship by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.mentorshipsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Put(':id')
  @ApiOperation({ summary: 'Update a mentorship' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMentorshipDto: UpdateMentorshipDto) {
    return this.mentorshipsService.update(id, updateMentorshipDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a mentorship' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mentorshipsService.remove(id);
  }
}
