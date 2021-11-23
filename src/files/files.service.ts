import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from './entities/file.entity'
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadFileDto } from './dto/upload-file.dto';

import { S3 } from "aws-sdk";
import { randomBytes } from "crypto";

@Injectable()
export class FilesService {
  private AWS_S3_BUCKET: string; 
  private s3: S3;

  constructor(private prisma: PrismaService, private configService: ConfigService) {
    this.AWS_S3_BUCKET = this.configService.get<string>('AWS_BUCKET_NAME');
    this.s3 = new S3
    ({
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY_SECRET'),
        region: this.configService.get<string>('AWS_REGION'),
    });
  }
  async uploadFile(uploadFile: UploadFileDto):Promise<File> {
    const { path, buffer } = uploadFile
    const hash = randomBytes(16).toString('hex').replace(/\//gi, '-');

    await this.s3
    .upload({
      Bucket: this.AWS_S3_BUCKET,
      Key: `${path}/${hash}`,
      Body: buffer,
    })
    .promise()
    .then((response) => {
      return response.Location;
    })
    .catch(() => { throw new BadRequestException('Erro na criação do arquivo!'); })

    return this.prisma.file.create({
      data: {...uploadFile, path: `${path}/${hash}`}
    })
  }

  async getFile(path: string): Promise<File> {
    const [file] = await this.prisma.file.findMany({
      where: {
        path
      }
    })

    if(!file) throw new NotFoundException('Arquivo não encontrado!')

    return file
  }

  async removeFile(key: string): Promise<void> {
    const file = await this.getFile(key)

    await this.prisma.file.delete({
      where: {
        id: file.id
      }
    })

    return this.s3
    .deleteObject({
      Bucket: this.AWS_S3_BUCKET,
      Key: key,
    })
    .promise()
    .then(() => {})
    .catch(() => { throw new BadRequestException('Erro ao deletar arquivo!'); });
  }
}
