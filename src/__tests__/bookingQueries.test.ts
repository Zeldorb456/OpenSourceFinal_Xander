import bookingQueries from '../infrastructure/mongodb/queries/booking';

describe('Booking Queries', () => {
  it('should create booking', async () => {
    const mockSaved = { _id: '1', serviceId: 'service1', userId: 'user1', date: new Date(), toObject: () => ({ _id: '1', serviceId: 'service1', userId: 'user1', date: new Date() }) };
    const mockModel = jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue(mockSaved),
    }));

    const result = await bookingQueries.createBooking(mockModel, {
      serviceId: 'service1',
      userId: 'user1',
      date: new Date()
    });
    expect(result._id).toBe('1');
  });

  it('should get bookings', async () => {
    const mockModel = {
      find: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue([{ _id: '1' }]),
        }),
      }),
    };

    const result = await bookingQueries.getBookings(mockModel);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get booking by id', async () => {
    const mockModel = {
      findById: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue({ _id: '1' }),
        }),
      }),
    };

    const result = await bookingQueries.getBookingById(mockModel, '1');
    expect(result._id).toBe('1');
  });

  it('should update booking status', async () => {
    const mockModel = {
      findByIdAndUpdate: jest.fn().mockResolvedValue({ _id: '1', status: 'confirmed' }),
    };

    const result = await bookingQueries.updateBookingStatus(mockModel, '1', 'confirmed');
    expect(result.status).toBe('confirmed');
  });

  it('should get bookings by user', async () => {
    const mockModel = {
      find: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue([{ _id: '1', userId: 'user1' }]),
      }),
    };

    const result = await bookingQueries.getBookingsByUser(mockModel, 'user1');
    expect(Array.isArray(result)).toBe(true);
  });
});