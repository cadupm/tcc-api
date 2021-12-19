import * as faker from 'faker'
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

export const mockCreateReviewResult = (): Review => ({
    id: faker.datatype.number(),
    comment: faker.datatype.string(),
    submissionId: faker.datatype.number(),
    mentorshipId: faker.datatype.uuid(),
    createdAt: new Date(),
    updatedAt: new Date()
});