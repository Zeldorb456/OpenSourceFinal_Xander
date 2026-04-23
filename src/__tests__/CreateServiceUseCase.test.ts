import { CreateServiceUseCase } from '../use-cases/service';
import { IServiceRepository } from '../interfaces/repositories';

describe('CreateServiceUseCase', () => {
  let serviceRepository: jest.Mocked<IServiceRepository>;
  let useCase: CreateServiceUseCase;

  beforeEach(() => {
    serviceRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateAvailability: jest.fn(),
    };

    useCase = new CreateServiceUseCase(serviceRepository);
  });

  it('should create a service', async () => {
    const serviceData = {
      name: 'Hotel Booking',
      type: 'hotel',
      price: 100,
    };

    const mockService = { _id: 'service1', ...serviceData };

    serviceRepository.create.mockResolvedValue(mockService);

    const result = await useCase.execute(serviceData);

    expect(result).toEqual(mockService);
    expect(serviceRepository.create).toHaveBeenCalledWith(serviceData);
  });
});