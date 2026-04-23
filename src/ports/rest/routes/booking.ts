import express, { NextFunction, Response, Request } from "express";
import dependencies from '../../../infrastructure/dependencies';
import { createService, getServices, createBooking, getBookings, updateBookingStatus } from '../../../infrastructure/booking';
import { authenticateToken, authenticateAdmin } from '../middleware/authentication';
import bookingController from '../../../controllers/booking';

const router = express.Router();

// Get all services
router.get("/services", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await getServices(dependencies)();
    res.status(200).json(services);
  } catch (error) {
    console.log(`Error retrieving services: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error retrieving services: ${(error as Error).message}`
    });
  }
});

// Create a service (admin only)
router.post("/services", authenticateAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const serviceData = req.body;
    const result = await createService(dependencies)(serviceData);
    res.status(201).json(result);
  } catch (error) {
    console.log(`Error creating service: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error creating service: ${(error as Error).message}`
    });
  }
});

// Create a booking
router.post("/book", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;
    bookingController.validateBookingData(bookingData);
    const result = await createBooking(dependencies)(bookingData);
    res.status(201).json(result);
  } catch (error) {
    console.log(`Error creating booking: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error creating booking: ${(error as Error).message}`
    });
  }
});

// Get all bookings (admin only)
router.get("/bookings", authenticateAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getBookings(dependencies)();
    res.status(200).json(bookings);
  } catch (error) {
    console.log(`Error retrieving bookings: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error retrieving bookings: ${(error as Error).message}`
    });
  }
});

// Update booking status (admin only)
router.put("/bookings/:id/status", authenticateAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateBookingStatus(dependencies)(id, status);
    res.status(200).json(result);
  } catch (error) {
    console.log(`Error updating booking status: ${(error as Error).message}`);
    res.status(500).json({
      message: `Error updating booking status: ${(error as Error).message}`
    });
  }
});

export = router;
