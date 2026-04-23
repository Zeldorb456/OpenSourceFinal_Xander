import mongoDbClient from '../infrastructure/mongodb/mongoDbClient';
import { Service, Booking, User } from '../infrastructure/mongodb/models';

describe('MongoDB Models', () => {
  it('should export Service model', () => {
    expect(mongoDbClient).toBeDefined();
    expect(mongoDbClient.Service).toBeDefined();
  });

  it('should export Booking model', () => {
    expect(mongoDbClient.Booking).toBeDefined();
  });

  it('should export User model', () => {
    expect(mongoDbClient.User).toBeDefined();
  });

  it('should be a valid model instance', () => {
    expect(typeof mongoDbClient.Service).not.toBe('undefined');
    expect(typeof mongoDbClient.Booking).not.toBe('undefined');
    expect(typeof mongoDbClient.User).not.toBe('undefined');
  });
});
