import * as faker from 'faker/locale/en_AU'
import { Review } from "src/reviews/entities/review.entity"

export class Submission {
    id: number
    description: string
    notReviewed: boolean
    mentorshipId: string
    filesUrl: string[]
    reviews?: Review[]
    createdAt: Date
    updatedAt: Date
}

export const mockCreateSubmissionResult = (): Submission => ({
    id: faker.datatype.number(),
    description: 'some random description',
    notReviewed: faker.datatype.boolean(),
    mentorshipId: faker.datatype.uuid(),
    filesUrl: [faker.internet.avatar(), faker.internet.avatar()],
    createdAt: new Date(),
    updatedAt: new Date()
  });