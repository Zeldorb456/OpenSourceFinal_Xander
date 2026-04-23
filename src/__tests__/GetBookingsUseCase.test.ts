import { GetBookingsUseCase } from '../use-cases/booking';
import { IBookingRepository } from '../interfaces/repositories';

describe('GetBookingsUseCase', () => {
  let bookingRepository: jest.Mocked<IBookingRepository>;
  let useCase: GetBookingsUseCase;

  beforeEach(() => {
    bookingRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
      findByUser: jest.fn(),
    };

    useCase = new GetBookingsUseCase(bookingRepository);
  });

  it('should return all bookings', async () => {
    const mockBookings = [
      { _id: '1', serviceId: 'service1' },
      { _id: '2', serviceId: 'service2' },
    ];

    bookingRepository.findAll.mockResolvedValue(mockBookings);

    const result = await useCase.execute();

    expect(result).toEqual(mockBookings);
    expect(bookingRepository.findAll).toHaveBeenCalled();
  });
});