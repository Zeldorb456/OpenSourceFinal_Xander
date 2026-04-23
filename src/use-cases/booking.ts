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

    // Check availability
    const service = await this.serviceRepository.findById(bookingData.serviceId);
    if (!service || !service.availability) {
      throw new Error('Service not found');
    }

    const availability = service.availability.find((avail: any) => {
      const availDate = new Date(avail.date);
      return availDate.toDateString() === bookingDate.toDateString();
    });

    if (!availability || availability.availableSlots <= availability.bookedSlots) {
      throw new Error('Service not available for the selected date');
    }

    const bookingPayload = {
      ...bookingData,
      date: bookingDate,
    };

    const createdBooking = await this.bookingRepository.create(bookingPayload);

    // Update service availability
    await this.serviceRepository.updateAvailability(bookingData.serviceId, bookingDate, 1);

    return createdBooking;
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