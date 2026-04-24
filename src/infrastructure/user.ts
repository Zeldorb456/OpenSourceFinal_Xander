import { CreateUserUseCase, GetUserByUsernameUseCase } from '../use-cases/user';
import { MongoUserRepository } from './repositories/userRepository';

export const createUser = (serviceContainer: any) => {
  return async (userProfile: any) => {
    const db = serviceContainer.mongoDbClient;
    const repo = new MongoUserRepository(db.User);
    const usecase = new CreateUserUseCase(repo);
    return usecase.execute(userProfile);
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