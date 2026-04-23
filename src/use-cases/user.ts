import { IUserRepository } from 'interfaces/repositories';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: any): Promise<any> {
    return await this.userRepository.create(userData);
  }
}

export class GetUserByUsernameUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userName: string): Promise<any> {
    return await this.userRepository.findByUsername(userName);
  }
}