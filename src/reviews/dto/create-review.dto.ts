import { Review } from "../entities/review.entity";

export class CreateReviewDto {
    comment: Review['comment']
    submissionId: Review['submissionId']
}
