import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ListTeacherDto } from './dto/list-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { name, email, roles, password, registration } = createTeacherDto

    const [existentUser] = await this.usersService.findAll({ email })

    if(existentUser) throw new BadRequestException('Professor já cadastrado!')
    
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        roles,
        password
      }
    })

    const teacher = await this.prisma.teacher.create({
      data: {
        userId: user.id,
        registration
      }
    })

    return teacher
  }

  async findAll(listTeacherDto: ListTeacherDto): Promise<Teacher[]> {
    const { registration, ...restListTeacherDto } = listTeacherDto

    const users = await this.usersService.findAll({ ...restListTeacherDto })
    const userIds = users.map(user => user.id)

    const teachers = await this.prisma.teacher.findMany({
      include: {
        user: true
      },
      where: {
        registration: {
          contains: registration,
          mode: 'insensitive'
        },
        userId: {
          in: userIds
        }
      }
    });

    const modifyTeachers = teachers.map(teacher => {
      delete teacher.user.password

      return teacher
    })

    return modifyTeachers
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      include: {
        user: true
      }, 
      where: {
        id
    }});

    delete teacher.user.password

    if(!teacher) throw new NotFoundException('Professor não cadastrado!')

    return teacher
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto, file?: Express.Multer.File): Promise<Teacher> {
    const { registration, ...rest } = updateTeacherDto

    const teacherInfo = await this.findOne(id)

    let newProfileImage = ''
    if(file) {
      if(teacherInfo.user.profileImage.length) await this.filesService.removeFile(teacherInfo.user.profileImage)
      newProfileImage = await this.filesService.uploadFile(id, { path: file.originalname, buffer: file.buffer, mimetype: file.mimetype }, 'avatar')
    }

    await this.usersService.update(teacherInfo.userId, {...rest, profileImage: newProfileImage})

    await this.usersService.update(teacherInfo.userId, rest)
    
    return this.prisma.teacher.update({
      include: {
        user: true,
      },
      where: {
        id
      },
      data: { 
        registration
      }
    })
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)
        
    await this.prisma.teacher.delete({
      where: {
        id
      }
    });
  }
}
