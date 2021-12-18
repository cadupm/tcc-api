import { ApiProperty } from "@nestjs/swagger"
import {  IsNotEmpty, IsString, IsUUID } from "class-validator"
import { Submission } from "../entities/submission.entity"

export class CreateSubmissionDto {
    @ApiProperty({ required: true, type: String, description: 'description' })
    @IsString()
    @IsNotEmpty()
    description: Submission['description']

    @ApiProperty({ required: true, type: String, description: 'mentorshipId' })
    @IsUUID()
    @IsNotEmpty()
    mentorshipId: Submission['mentorshipId']
}
