import { CreateBookingUseCase } from '../use-cases/booking';
import { IBookingRepository, IServiceRepository } from '../interfaces/repositories';

describe('CreateBookingUseCase', () => {
  let bookingRepository: jest.Mocked<IBookingRepository>;
  let serviceRepository: jest.Mocked<IServiceRepository>;
  let useCase: CreateBookingUseCase;

  beforeEach(() => {
    bookingRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
      findByUser: jest.fn(),
    };

    serviceRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateAvailability: jest.fn(),
    };

    useCase = new CreateBookingUseCase(bookingRepository, serviceRepository);
  });

  it('should create a booking successfully', async () => {
    const bookingData = {
      serviceId: 'service1',
      userId: 'user1',
      date: '2023-12-25',
    };

    const mockService = {
      _id: 'service1',
      availability: [{
        date: new Date('2023-12-25'),
        availableSlots: 5,
        bookedSlots: 2,
      }],
    };

    const mockBooking = { _id: 'booking1', ...bookingData };

    serviceRepository.findById.mockResolvedValue(mockService);
    bookingRepository.create.mockResolvedValue(mockBooking);
    serviceRepository.updateAvailability.mockResolvedValue(mockService);

    const result = await useCase.execute(bookingData);

    expect(result).toEqual(mockBooking);
    expect(bookingRepository.create).toHaveBeenCalledWith({
      ...bookingData,
      date: new Date('2023-12-25'),
    });
    expect(serviceRepository.updateAvailability).toHaveBeenCalledWith('service1', new Date('2023-12-25'), 1);
  });

  it('should throw error for invalid date', async () => {
    const bookingData = {
      serviceId: 'service1',
      date: 'invalid-date',
    };

    await expect(useCase.execute(bookingData)).rejects.toThrow('Invalid booking date');
  });

  it('should throw error if service not available', async () => {
    const bookingData = {
      serviceId: 'service1',
      date: '2023-12-25',
    };

    const mockService = {
      _id: 'service1',
      availability: [{
        date: new Date('2023-12-25'),
        availableSlots: 5,
        bookedSlots: 5,
      }],
    };

    serviceRepository.findById.mockResolvedValue(mockService);

    await expect(useCase.execute(bookingData)).rejects.toThrow('Service not available for the selected date');
  });
});