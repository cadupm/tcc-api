import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { Metric } from "src/metrics/entities/metric.entity"

export class UpdateMetricDto {
    @ApiProperty({ required: false, type: String, description: 'name' })
    @IsString()
    @IsOptional()
    name?: Metric['name']
    
    @ApiProperty({ required: false, type: String, description: 'description' })
    @IsString()
    @IsOptional()
    description?: Metric['description']
}
