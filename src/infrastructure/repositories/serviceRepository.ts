import { IServiceRepository } from 'interfaces/repositories';
import serviceQueries from '../mongodb/queries/service';

export class MongoServiceRepository implements IServiceRepository {
  constructor(private mongoDbService: any) {}

  async create(serviceData: any): Promise<any> {
    return await serviceQueries.createService(this.mongoDbService, serviceData);
  }

  async findAll(): Promise<any[]> {
    return await serviceQueries.getServices(this.mongoDbService);
  }

  async findById(id: string): Promise<any> {
    return await serviceQueries.getServiceById(this.mongoDbService, id);
  }

  async updateAvailability(id: string, date: Date, bookedSlots: number): Promise<any> {
    return await serviceQueries.updateServiceAvailability(this.mongoDbService, id, date, bookedSlots);
  }
}