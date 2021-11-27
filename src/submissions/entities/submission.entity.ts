import { Review } from "src/reviews/entities/review.entity"

export class Submission {
    id: number
    description: string
    notReviewed: boolean
    mentorshipId: string
    reviews: Review[]
    createdAt: Date
    updatedAt: Date
}
