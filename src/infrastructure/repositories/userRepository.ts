import { IUserRepository } from 'interfaces/repositories';
import userQueries from '../mongodb/queries/user';

export class MongoUserRepository implements IUserRepository {
  constructor(private mongoDbUser: any) {}

  async create(userData: any): Promise<any> {
    return await userQueries.createUser(this.mongoDbUser, userData);
  }

  async findByUsername(userName: string): Promise<any> {
    return await userQueries.getUserByUsername(this.mongoDbUser, userName);
  }

  async findById(id: string): Promise<any> {
    return await userQueries.getUserById(this.mongoDbUser, id);
  }
}