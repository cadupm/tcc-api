import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Metric } from "src/metrics/entities/metric.entity"

export class CreateMetricDto {
    @ApiProperty({ required: true, type: String, description: 'name' })
    @IsString()
    @IsNotEmpty()
    name: Metric['name']

    @ApiProperty({ required: true, type: String, description: 'description' })
    @IsString()
    @IsNotEmpty()
    description: Metric['description']

    @ApiProperty({ required: true, type: Number, description: 'reviewId' })
    @IsNumber()
    @IsNotEmpty()
    reviewId: Metric['reviewId']
}
