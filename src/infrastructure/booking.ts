import { CreateServiceUseCase, GetServicesUseCase } from '../use-cases/service';
import { CreateBookingUseCase, GetBookingsUseCase, UpdateBookingStatusUseCase } from '../use-cases/booking';
import { MongoServiceRepository } from './repositories/serviceRepository';
import { MongoBookingRepository } from './repositories/bookingRepository';

export const createService = (dependencies: any) => {
  return async (serviceData: any) => {
    const { mongoDbClient } = dependencies;
    const serviceRepository = new MongoServiceRepository(mongoDbClient.Service);
    const useCase = new CreateServiceUseCase(serviceRepository);
    return await useCase.execute(serviceData);
  };
};

export const getServices = (dependencies: any) => {
  return async () => {
    const { mongoDbClient } = dependencies;
    const serviceRepository = new MongoServiceRepository(mongoDbClient.Service);
    const useCase = new GetServicesUseCase(serviceRepository);
    return await useCase.execute();
  };
};

export const createBooking = (dependencies: any) => {
  return async (bookingData: any) => {
    const { mongoDbClient } = dependencies;
    const bookingRepository = new MongoBookingRepository(mongoDbClient.Booking);
    const serviceRepository = new MongoServiceRepository(mongoDbClient.Service);
    const useCase = new CreateBookingUseCase(bookingRepository, serviceRepository);
    return await useCase.execute(bookingData);
  };
};

export const getBookings = (dependencies: any) => {
  return async () => {
    const { mongoDbClient } = dependencies;
    const bookingRepository = new MongoBookingRepository(mongoDbClient.Booking);
    const useCase = new GetBookingsUseCase(bookingRepository);
    return await useCase.execute();
  };
};

export const updateBookingStatus = (dependencies: any) => {
  return async (bookingId: string, status: string) => {
    const { mongoDbClient } = dependencies;
    const bookingRepository = new MongoBookingRepository(mongoDbClient.Booking);
    const useCase = new UpdateBookingStatusUseCase(bookingRepository);
    return await useCase.execute(bookingId, status);
  };
};