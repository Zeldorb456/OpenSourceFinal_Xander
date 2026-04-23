import { GetServicesUseCase } from '../use-cases/service';
import { IServiceRepository } from '../interfaces/repositories';

describe('GetServicesUseCase', () => {
  let serviceRepository: jest.Mocked<IServiceRepository>;
  let useCase: GetServicesUseCase;

  beforeEach(() => {
    serviceRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateAvailability: jest.fn(),
    };

    useCase = new GetServicesUseCase(serviceRepository);
  });

  it('should return all services', async () => {
    const mockServices = [
      { _id: '1', name: 'Hotel' },
      { _id: '2', name: 'Car Rental' },
    ];

    serviceRepository.findAll.mockResolvedValue(mockServices);

    const result = await useCase.execute();

    expect(result).toEqual(mockServices);
    expect(serviceRepository.findAll).toHaveBeenCalled();
  });
});