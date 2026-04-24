import { IBookingRepository } from 'interfaces/repositories';
import bookingQueries from '../mongodb/queries/booking';

export class MongoBookingRepository implements IBookingRepository {
  constructor(private mongoDbBooking: any) {}

  async create(bookingData: any): Promise<any> {
    const booking = await bookingQueries.createBooking(this.mongoDbBooking, bookingData);
    console.log('New booking created:', booking._id);
    return booking;
  }

  async findAll(): Promise<any[]> {
    return bookingQueries.getBookings(this.mongoDbBooking);
  }

  async findById(id: string): Promise<any> {
    const booking = await bookingQueries.getBookingById(this.mongoDbBooking, id);
    return booking;
  }

  async updateStatus(id: string, status: string): Promise<any> {
    return bookingQueries.updateBookingStatus(this.mongoDbBooking, id, status);
  }

  async findByUser(userId: string): Promise<any[]> {
    return await bookingQueries.getBookingsByUser(this.mongoDbBooking, userId);
  }
}