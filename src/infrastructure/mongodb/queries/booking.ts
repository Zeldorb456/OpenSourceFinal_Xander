import mongoose from 'mongoose';

const createBooking = async (mongoDbBooking: any, bookingData: any) =>
{
  const result = await new mongoDbBooking({
    _id: new mongoose.Types.ObjectId(),
    ...bookingData,
  }).save();
  return result.toObject();
}

const getBookings = async (mongoDbBooking: any) =>
{
  const bookings = await mongoDbBooking.find({}).populate('serviceId').populate('userId');
  return bookings;
}

const getBookingById = async (mongoDbBooking: any, bookingId: string) =>
{
  const booking = await mongoDbBooking.findById(bookingId).populate('serviceId').populate('userId');
  return booking;
}

const updateBookingStatus = async (mongoDbBooking: any, bookingId: string, status: string) =>
{
  const booking = await mongoDbBooking.findByIdAndUpdate(bookingId, { status, updatedAt: new Date() }, { new: true });
  return booking;
}

const getBookingsByUser = async (mongoDbBooking: any, userId: string) =>
{
  const bookings = await mongoDbBooking.find({ userId }).populate('serviceId');
  return bookings;
}

export default  {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  getBookingsByUser,
};