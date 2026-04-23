describe('Infrastructure Layer', () => {
  it('should export booking infrastructure', () => {
    const booking = require('../infrastructure/booking');
    expect(booking.createService).toBeDefined();
    expect(booking.getServices).toBeDefined();
    expect(booking.createBooking).toBeDefined();
    expect(booking.getBookings).toBeDefined();
    expect(booking.updateBookingStatus).toBeDefined();
  });

  it('should export user infrastructure', () => {
    const user = require('../infrastructure/user');
    expect(user.createUser).toBeDefined();
    expect(user.getUserByUsername).toBeDefined();
    expect(user.getUserById).toBeDefined();
  });

  it('should export dependencies', () => {
    const deps = require('../infrastructure/dependencies');
    expect(deps.default).toBeDefined();
    expect(deps.default.mongoDbClient).toBeDefined();
  });
});
