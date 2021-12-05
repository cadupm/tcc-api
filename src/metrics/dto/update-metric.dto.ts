import { IsOptional, IsString } from "class-validator"
import { Metric } from "src/metrics/entities/metric.entity"

export class UpdateMetricDto {
    @IsString()
    @IsOptional()
    name?: Metric['name']
    
    @IsString()
    @IsOptional()
    description?: Metric['description']
}
