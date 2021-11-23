import { File } from '../entities/file.entity'

export class UploadFileDto {
    buffer: File['buffer']
    path: File['path']
}
