import faker from "faker"
import { User } from "src/users/entities/user.entity"

export class Teacher {
    id: string
    userId: string
    user?: User
    registration: string
    createdAt: Date
    updatedAt: Date
}

export const mockCreateTeacherResult = (): Teacher => ({
  id: faker.datatype.uuid(),
  userId: 'same-random-id',
  user: {
      id: 'same-random-id',
      name: faker.name.firstName(),
      email: faker.internet.email(),
      roles: [faker.random.arrayElement(["student", "teacher"])],
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date()
  },
  registration: faker.name.jobType(),
  createdAt: new Date(),
  updatedAt: new Date()
});