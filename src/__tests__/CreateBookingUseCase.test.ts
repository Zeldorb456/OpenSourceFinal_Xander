import { CreateBookingUseCase } from '../use-cases/booking';
import { IBookingRepository, IServiceRepository } from '../interfaces/repositories';

describe('Booking Creation Use Case', () => {
  let bookingRepo: jest.Mocked<IBookingRepository>;
  let serviceRepo: jest.Mocked<IServiceRepository>;
  let createBookingCase: CreateBookingUseCase;

  beforeEach(() => {
    bookingRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
      findByUser: jest.fn(),
    };

    serviceRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateAvailability: jest.fn(),
    };

    createBookingCase = new CreateBookingUseCase(bookingRepo, serviceRepo);
  });

  it('creates booking when service available', async () => {
    const input = {
      serviceId: 'svc_001',
      userId: 'usr_001',
      date: '2023-12-25',
    };

    const mockSvc = {
      _id: 'svc_001',
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