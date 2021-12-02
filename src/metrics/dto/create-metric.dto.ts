import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"
import { Metric } from "src/metrics/entities/metric.entity"

export class CreateMetricDto {
    @IsString()
    @IsNotEmpty()
    name: Metric['name']

    @IsString()
    @IsNotEmpty()
    description: Metric['description']

    @IsNumber()
    @IsNotEmpty()
    reviewId: Metric['reviewId']
}
