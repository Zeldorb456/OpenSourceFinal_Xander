import { UpdateBookingStatusUseCase } from '../use-cases/booking';
import { IBookingRepository } from '../interfaces/repositories';

describe('UpdateBookingStatusUseCase', () => {
  let bookingRepository: jest.Mocked<IBookingRepository>;
  let useCase: UpdateBookingStatusUseCase;

  beforeEach(() => {
    bookingRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
      findByUser: jest.fn(),
    };

    useCase = new UpdateBookingStatusUseCase(bookingRepository);
  });

  it('should update booking status', async () => {
    const bookingId = 'booking1';
    const status = 'confirmed';
    const mockUpdatedBooking = { _id: bookingId, status };

    bookingRepository.updateStatus.mockResolvedValue(mockUpdatedBooking);

    const result = await useCase.execute(bookingId, status);

    expect(result).toEqual(mockUpdatedBooking);
    expect(bookingRepository.updateStatus).toHaveBeenCalledWith(bookingId, status);
  });
});