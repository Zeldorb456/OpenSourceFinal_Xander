import userQueries from '../infrastructure/mongodb/queries/user';

describe('User Queries', () => {
  it('should create user', async () => {
    const mockSaved = { _id: '1', userName: 'testuser', userPassword: 'hash', email: 'test@example.com', toObject: () => ({ _id: '1', userName: 'testuser', userPassword: 'hash', email: 'test@example.com' }) };
    const mockModel = jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue(mockSaved),
    }));

    const result = await userQueries.createUser(mockModel, {
      userName: 'testuser',
      userPassword: 'hash',
      email: 'test@example.com'
    });
    expect(result._id).toBe('1');
    expect(result.userName).toBe('testuser');
  });

  it('should get user by username', async () => {
    const mockModel = {
      findOne: jest.fn().mockResolvedValue({ _id: '1', userName: 'testuser' }),
    };

    const result = await userQueries.getUserByUsername(mockModel, 'testuser');
    expect(result.userName).toBe('testuser');
  });

  it('should get user by id', async () => {
    const mockModel = {
      findById: jest.fn().mockResolvedValue({ _id: '1', userName: 'testuser' }),
    };

    const result = await userQueries.getUserById(mockModel, '1');
    expect(result._id).toBe('1');
  });
});