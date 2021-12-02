import { IsNotEmpty, IsString } from 'class-validator'
import { File } from '../entities/file.entity'

export class UploadFileDto {
    @IsString()
    @IsNotEmpty()
    buffer: File['buffer']

    @IsString()
    @IsNotEmpty()
    path: File['path']
}
