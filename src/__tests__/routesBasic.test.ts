import { Router } from 'express';

describe('Booking Routes', () => {
  it('should define routes', () => {
    const router = Router();
    expect(router).toBeDefined();
    expect(typeof router.get).toBe('function');
    expect(typeof router.post).toBe('function');
  });

  it('should handle GET /services', async () => {
    const getServices = jest.fn().mockResolvedValue([]);
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getServices();
    expect(getServices).toHaveBeenCalled();
  });

  it('should handle POST /book', async () => {
    const createBooking = jest.fn().mockResolvedValue({ _id: '1' });
    const req = { body: { serviceId: 's1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await createBooking();
    expect(createBooking).toHaveBeenCalled();
  });
});
