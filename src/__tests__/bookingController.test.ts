import bookingController from '../controllers/booking';

describe('Booking Controller', () => {
  describe('checkAvailability', () => {
    it('should return true if slots available', async () => {
      const mockService = {
        availability: [{
          date: new Date('2023-12-25'),
          availableSlots: 5,
          bookedSlots: 2,
        }],
      };

      const mongoDbService = {
        findById: jest.fn().mockResolvedValue(mockService),
      };

      const result = await bookingController.checkAvailability(mongoDbService, 'service1', new Date('2023-12-25'));

      expect(result).toBe(true);
    });

    it('should return false if no slots available', async () => {
      const mockService = {
        availability: [{
          date: new Date('2023-12-25'),
          availableSlots: 5,
          bookedSlots: 5,
        }],
      };

      const mongoDbService = {
        findById: jest.fn().mockResolvedValue(mockService),
      };

      const result = await bookingController.checkAvailability(mongoDbService, 'service1', new Date('2023-12-25'));

      expect(result).toBe(false);
    });

    it('should return false if service not found', async () => {
      const mongoDbService = {
        findById: jest.fn().mockResolvedValue(null),
      };

      const result = await bookingController.checkAvailability(mongoDbService, 'service1', new Date('2023-12-25'));

      expect(result).toBe(false);
    });
  });

  describe('validateBookingData', () => {
    it('should not throw for valid data with user', () => {
      const data = {
        serviceId: 'service1',
        date: '2023-12-25',
        userId: 'user1',
      };

      expect(() => bookingController.validateBookingData(data)).not.toThrow();
    });

    it('should not throw for valid data with guest', () => {
      const data = {
        serviceId: 'service1',
        date: '2023-12-25',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
      };

      expect(() => bookingController.validateBookingData(data)).not.toThrow();
    });

    it('should throw if serviceId missing', () => {
      const data = {
        date: '2023-12-25',
        userId: 'user1',
      };

      expect(() => bookingController.validateBookingData(data)).toThrow('Service ID and date are required');
    });

    it('should throw if date missing', () => {
      const data = {
        serviceId: 'service1',
        userId: 'user1',
      };

      expect(() => bookingController.validateBookingData(data)).toThrow('Service ID and date are required');
    });

    it('should throw if guest data incomplete', () => {
      const data = {
        serviceId: 'service1',
        date: '2023-12-25',
        guestName: 'John Doe',
        // missing email
      };

      expect(() => bookingController.validateBookingData(data)).toThrow('Guest name and email are required for guest bookings');
    });
  });
});