import mongoose from 'mongoose';

const createBooking = async (mongoDbBooking: any, bookingData: any) => {
  const id = new mongoose.Types.ObjectId();
  const booking = new mongoDbBooking({
    _id: id,
    ...bookingData,
  });
  const result = await booking.save();
  return result.toObject();
}

const getBookings = async (mongoDbBooking: any) => {
  try {
    return await mongoDbBooking.find({}).populate('serviceId').populate('userId');
  } catch (err) {
    console.error('Failed to fetch bookings:', err);
    throw err;
  }
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