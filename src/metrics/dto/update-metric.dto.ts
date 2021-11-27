import { Metric } from "src/metrics/entities/metric.entity"

export class UpdateMetricDto {
    name?: Metric['name']
    description?: Metric['description']
}
