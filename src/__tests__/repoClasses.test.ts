import { MongoServiceRepository } from '../infrastructure/repositories/serviceRepository';
import { MongoUserRepository } from '../infrastructure/repositories/userRepository';
import { MongoBookingRepository } from '../infrastructure/repositories/bookingRepository';

describe('Repository Classes', () => {
  const mockModel = { find: jest.fn(), findById: jest.fn(), findOne: jest.fn() };

  it('should instantiate service repository', () => {
    const repo = new MongoServiceRepository(mockModel);
    expect(repo).toBeDefined();
  });

  it('should instantiate user repository', () => {
    const repo = new MongoUserRepository(mockModel);
    expect(repo).toBeDefined();
  });

  it('should instantiate booking repository', () => {
    const repo = new MongoBookingRepository(mockModel);
    expect(repo).toBeDefined();
  });
});
