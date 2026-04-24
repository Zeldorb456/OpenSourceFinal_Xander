import express, { NextFunction, Response, Request } from "express";
import dependencies from '../../../infrastructure/dependencies';
import { createService, getServices, createBooking, getBookings, updateBookingStatus } from '../../../infrastructure/booking';
import { authenticateToken, authenticateAdmin } from '../middleware/authentication';
import bookingController from '../../../controllers/booking';

const router = express.Router();

router.get("/services", async (req: Request, res: Response) => {
  try {
    const svc = await getServices(dependencies)();
    res.json(svc);
  } catch (error) {
    const msg = (error as Error).message;
    console.error(`Cannot retrieve services: ${msg}`);
    res.status(500).json({ message: msg });
  }
});

router.post("/services", authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newService = await createService(dependencies)(payload);
    res.status(201).json(newService);
  } catch (e) {
    console.log(`Failed to create service`);
    res.status(500).send(e);
  }
});

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
