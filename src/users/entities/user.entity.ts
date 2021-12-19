import * as faker from 'faker'

export class User {
    id: string
    name: string
    email: string
    password: string
    roles: Array<"student" | "teacher">
    profileImage?: string
    expertise?: string
    bio?: string
    gitHubLink?: string
    linkedinLink?: string
    contact?: string
    createdAt: Date
    updatedAt: Date
}

export const mockCreateUserParams = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roles: [faker.random.arrayElement(["student", "teacher"])],
    profileImage: 'url qualquer',
    expertise: 'data science',
    bio: 'meu nome é george',
    gitHubLink: 'link do github',
    linkedinLink: 'link do linkedin',
    contact: '81996566148'
  });
  
  export const mockListUserParams = () => ({
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    roles: [faker.random.arrayElement(["student", "teacher"])],
    name: faker.name.firstName(),
  });
  
  export const mockUpdateUserParams = () => ({
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    role: [faker.random.arrayElement(["student", "teacher"])],
    name: faker.name.firstName(),
    password: faker.internet.password(),
  });
  
  export const mockCreateUserResult = (): User => ({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    roles: [faker.random.arrayElement(["student", "teacher"])],
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
