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
