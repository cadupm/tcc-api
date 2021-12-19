import * as faker from 'faker'
import { Review } from "src/reviews/entities/review.entity"

export class Metric {
    id: number
    name: string
    description: string
    reviewId: number
    review?: Review
    createdAt: Date
    updatedAt: Date
}

export const mockCreateMetricResult = (): Metric => ({
    id: faker.datatype.number(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
    reviewId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date()
});