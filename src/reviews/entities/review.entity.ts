import { Metric } from "src/metrics/entities/metric.entity"

export class Review {
    id: number
    comment: string
    submissionId: number
    metrics?: Metric[]
    createdAt: Date
    updatedAt: Date
}
