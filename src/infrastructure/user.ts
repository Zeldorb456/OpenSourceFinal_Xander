import { CreateUserUseCase, GetUserByUsernameUseCase } from '../use-cases/user';
import { MongoUserRepository } from './repositories/userRepository';

export const createUser = (dependencies: any) => {
  return async (userData: any) => {
    const { mongoDbClient } = dependencies;
    const userRepository = new MongoUserRepository(mongoDbClient.User);
    const useCase = new CreateUserUseCase(userRepository);
    return await useCase.execute(userData);
  };
};

export const getUserByUsername = (dependencies: any) => {
  return async (userName: string) => {
    const { mongoDbClient } = dependencies;
    const userRepository = new MongoUserRepository(mongoDbClient.User);
    const useCase = new GetUserByUsernameUseCase(userRepository);
    return await useCase.execute(userName);
  };
};

export const getUserById = (dependencies: any) => {
  return async (userId: string) => {
    const { mongoDbClient } = dependencies;
    const userRepository = new MongoUserRepository(mongoDbClient.User);
    const useCase = new GetUserByUsernameUseCase(userRepository);
    return await useCase.execute(userId);
  };
};