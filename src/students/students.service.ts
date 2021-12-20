import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ListStudentDto } from './dto/list-student-dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { name, email, roles, password, registration } = createStudentDto

    const [existentUser] = await this.usersService.findAll({ email })

    if(existentUser) throw new BadRequestException('Estudante já cadastrado!')
    
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        roles,
        password
      }
    })

    const student = await this.prisma.student.create({
      data: {
        userId: user.id,
        registration
      }
    })

    return student
  }

  async findAll(listStudentDto: ListStudentDto): Promise<Omit<Student, 'password'>[]> {
    const { registration, ...restListStudentDto } = listStudentDto

    const users = await this.usersService.findAll({ ...restListStudentDto })
    const userIds = users.map(user => user.id)

    const students = await this.prisma.student.findMany({
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

    const modifyStudents = students.map(student => {
      delete student.user.password

      return student
    })

    return modifyStudents
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      include: {
        user: true,
      }, 
      where: {
        id
    }});

    delete student.user.password

    if(!student) throw new NotFoundException('Estudante não cadastrado!')

    return student
  }

  async update(id: string, updateStudentDto: UpdateStudentDto, file?: Express.Multer.File): Promise<Student> {
    const { registration, ...rest } = updateStudentDto
    const { email } = rest

    const studentInfo = await this.findOne(id)

    if(email && studentInfo.user.email !== email) {
      const [existentUserWithEmail] = await this.usersService.findAll({ email })

      if(existentUserWithEmail.id !== studentInfo.userId) throw new BadRequestException('Estudante com email já cadastrado!')
    }

    let newProfileImage = ''
    if(file) {
      if(studentInfo.user.profileImage.length) await this.filesService.removeFile(studentInfo.user.profileImage)
      newProfileImage = await this.filesService.uploadFile(id, { path: file.originalname, buffer: file.buffer, mimetype: file.mimetype }, 'avatar')
    }

    await this.usersService.update(studentInfo.userId, {...rest, profileImage: newProfileImage})
    
    return this.prisma.student.update({
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
    
    await this.prisma.student.delete({
      where: {
        id
      }
    })
  }
}
