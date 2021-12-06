import { Metric } from "src/metrics/entities/metric.entity"

export class Review {
    id: number
    comment: string
    submissionId: number
    mentorshipId: string
    metrics?: Metric[]
    createdAt: Date
    updatedAt: Date
}
