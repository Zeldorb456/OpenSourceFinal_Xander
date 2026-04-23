import { IBookingRepository } from 'interfaces/repositories';
import bookingQueries from '../mongodb/queries/booking';

export class MongoBookingRepository implements IBookingRepository {
  constructor(private mongoDbBooking: any) {}

  async create(bookingData: any): Promise<any> {
    return await bookingQueries.createBooking(this.mongoDbBooking, bookingData);
  }

  async findAll(): Promise<any[]> {
    return await bookingQueries.getBookings(this.mongoDbBooking);
  }

  async findById(id: string): Promise<any> {
    return await bookingQueries.getBookingById(this.mongoDbBooking, id);
  }

  async updateStatus(id: string, status: string): Promise<any> {
    return await bookingQueries.updateBookingStatus(this.mongoDbBooking, id, status);
  }

  async findByUser(userId: string): Promise<any[]> {
    return await bookingQueries.getBookingsByUser(this.mongoDbBooking, userId);
  }
}