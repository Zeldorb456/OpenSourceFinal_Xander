import { GetUserByUsernameUseCase } from '../use-cases/user';
import { IUserRepository } from '../interfaces/repositories';

describe('GetUserByUsernameUseCase', () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let useCase: GetUserByUsernameUseCase;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findByUsername: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new GetUserByUsernameUseCase(userRepository);
  });

  it('should return user by username', async () => {
    const userName = 'testuser';
    const mockUser = { _id: 'user1', userName };

    userRepository.findByUsername.mockResolvedValue(mockUser);

    const result = await useCase.execute(userName);

    expect(result).toEqual(mockUser);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(userName);
  });
});