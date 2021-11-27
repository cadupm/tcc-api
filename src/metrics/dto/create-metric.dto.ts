import { Metric } from "src/metrics/entities/metric.entity"

export class CreateMetricDto {
    name: Metric['name']
    description: Metric['description']
    reviewId: Metric['reviewId']
}
