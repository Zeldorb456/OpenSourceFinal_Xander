import { NextFunction, Response, Request } from "express";
import dependencies from '../../../infrastructure/dependencies';
import { createService as createServiceInfra, getServices as getServicesInfra, createBooking as createBookingInfra, getBookings as getBookingsInfra, updateBookingStatus as updateBookingStatusInfra } from '../../../infrastructure/booking';
import bookingController from '../../../controllers/booking';

export const handleGetServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await getServicesInfra(dependencies)();
    res.status(200).json(services);
  } catch (error) {
    console.log(`Error retrieving services: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error retrieving services: ${(error as Error).message}`
    });
  }
};

export const handleCreateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const serviceData = req.body;
    const result = await createServiceInfra(dependencies)(serviceData);
    res.status(201).json(result);
  } catch (error) {
    console.log(`Error creating service: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error creating service: ${(error as Error).message}`
    });
  }
};

export const handleCreateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;
    bookingController.validateBookingData(bookingData);
    const result = await createBookingInfra(dependencies)(bookingData);
    res.status(201).json(result);
  } catch (error) {
    console.log(`Error creating booking: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error creating booking: ${(error as Error).message}`
    });
  }
};

export const handleGetBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getBookingsInfra(dependencies)();
    res.status(200).json(bookings);
  } catch (error) {
    console.log(`Error retrieving bookings: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error retrieving bookings: ${(error as Error).message}`
    });
  }
};

export const handleUpdateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateBookingStatusInfra(dependencies)(id, status);
    res.status(200).json(result);
  } catch (error) {
    console.log(`Error updating booking status: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error updating booking status: ${(error as Error).message}`
    });
  }
};
