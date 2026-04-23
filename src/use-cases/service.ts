import { IServiceRepository } from 'interfaces/repositories';

export class CreateServiceUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(serviceData: any): Promise<any> {
    return await this.serviceRepository.create(serviceData);
  }
}

export class GetServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(): Promise<any[]> {
    return await this.serviceRepository.findAll();
  }
}