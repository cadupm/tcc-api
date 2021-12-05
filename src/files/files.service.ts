import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadFileDto } from './dto/upload-file.dto';

import { S3 } from "aws-sdk";
import { randomBytes } from "crypto";

@Injectable()
export class FilesService {
  private AWS_S3_BUCKET: string; 
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.AWS_S3_BUCKET = this.configService.get<string>('AWS_BUCKET_NAME');
    this.s3 = new S3
    ({
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY_SECRET'),
        region: this.configService.get<string>('AWS_REGION'),
    });
  }
  async uploadFile(userId: string, uploadFile: UploadFileDto, folder: string):Promise<string> {
    const { path, buffer, mimetype } = uploadFile
    console.log(buffer)
    const hash = randomBytes(16).toString('hex').replace(/\//gi, '-');
    const [name, ext] = path.split('.')

    const fileUploaded = await this.s3
    .upload({
      Bucket: this.AWS_S3_BUCKET,
      Key: `${folder}/${userId}/${name}-${hash}.${ext}`,
      Body: buffer,
      ACL: 'public-read',
      ContentType: mimetype
    })
    .promise()
      .then((response) => {
        return response.Location;
      })
      .catch(() => {
        throw new BadRequestException('Erro na criação do arquivo!')
      });

    return fileUploaded;
  }

  async getFile(path: string): Promise<any> {
    const file = await this.s3.getObject({
      Bucket: this.AWS_S3_BUCKET,
      Key: path,
    })
    .promise()
      .then((response) => {
        return response;
      })
      .catch(() => {
        throw new BadRequestException('Arquivo não encontrado!')
      });

      return file
  }

  async removeFile(key: string): Promise<void> {
    await this.getFile(this.getImageKey(key))

    return this.s3
    .deleteObject({
      Bucket: this.AWS_S3_BUCKET,
      Key: this.getImageKey(key),
    })
    .promise()
    .then(() => {})
    .catch(() => { throw new BadRequestException('Erro ao deletar arquivo!'); });
  }

  private getImageKey(path: string) {
    const [, key] = path.split(`https://${this.AWS_S3_BUCKET}.s3.amazonaws.com/`);
    return key;
  }
}
