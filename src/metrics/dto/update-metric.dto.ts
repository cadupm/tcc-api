import { IsString } from "class-validator"
import { Metric } from "src/metrics/entities/metric.entity"

export class UpdateMetricDto {
    @IsString()
    name?: Metric['name']
    
    @IsString()
    description?: Metric['description']
}
