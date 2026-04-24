import { IBookingRepository, IServiceRepository } from 'interfaces/repositories';

export class CreateBookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private serviceRepository: IServiceRepository
  ) {}

  async execute(bookingData: any): Promise<any> {
    const bookingDate = new Date(bookingData.date);
    
    if (isNaN(bookingDate.getTime())) {
      throw new Error('Invalid booking date');
    }

    const svc = await this.serviceRepository.findById(bookingData.serviceId);
    if (!svc) throw new Error('Service not found');
    if (!svc.availability) throw new Error('Service has no availability');

    const availSlot = svc.availability.find((slot: any) => {
      return new Date(slot.date).toDateString() === bookingDate.toDateString();
    });

    if (!availSlot) throw new Error('No availability on selected date');
    if (availSlot.availableSlots <= availSlot.bookedSlots) {
      throw new Error('Service fully booked for this date');
    }

    const payload = {
      ...bookingData,
      date: bookingDate,
    };

    const booking = await this.bookingRepository.create(payload);
    await this.serviceRepository.updateAvailability(bookingData.serviceId, bookingDate, 1);
    return booking;
  }
}

export class GetBookingsUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(): Promise<any[]> {
    return await this.bookingRepository.findAll();
  }
}

export class UpdateBookingStatusUseCase {
  constructor(private bookingRepository: IBookingRepository) {}

  async execute(bookingId: string, status: string): Promise<any> {
    return await this.bookingRepository.updateStatus(bookingId, status);
  }
}