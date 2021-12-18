import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator"
import { Submission } from "../entities/submission.entity"

export class UpdateSubmissionDto {
    @ApiProperty({ required: false, type: String, description: 'description' })
    @IsString()
    @IsOptional()
    description?: Submission['description']

    @ApiProperty({ required: false, type: Array, description: 'filesUrl' })
    @IsArray()
    @IsOptional()
    filesUrl?: Submission['filesUrl']

    @ApiProperty({ required: false, type: Boolean, description: 'notReviewed' })
    @IsBoolean()
    @IsOptional()
    notReviewed?: Submission['notReviewed']
}