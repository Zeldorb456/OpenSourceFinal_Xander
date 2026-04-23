import { CreateUserUseCase } from '../use-cases/user';
import { IUserRepository } from '../interfaces/repositories';

describe('CreateUserUseCase', () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user', async () => {
    const userData = {
      userName: 'testuser',
      userPassword: 'hashedpass',
      email: 'test@example.com',
    };

    const mockUser = { _id: 'user1', ...userData };

    userRepository.create.mockResolvedValue(mockUser);

    const result = await useCase.execute(userData);

    expect(result).toEqual(mockUser);
    expect(userRepository.create).toHaveBeenCalledWith(userData);
  });
});