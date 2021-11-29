import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { MentorshipsService } from './mentorships.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { UpdateMentorshipDto } from './dto/update-mentorship.dto';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('mentorships')
@UseGuards(AuthGuard('jwt'))
export class MentorshipsController {
  constructor(private readonly mentorshipsService: MentorshipsService) {}

  @Post()
  @Roles(Role.Student)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMentorshipDto: CreateMentorshipDto) {
    return this.mentorshipsService.create(createMentorshipDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.mentorshipsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.mentorshipsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Teacher)
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMentorshipDto: UpdateMentorshipDto) {
    return this.mentorshipsService.update(id, updateMentorshipDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mentorshipsService.remove(id);
  }
}
