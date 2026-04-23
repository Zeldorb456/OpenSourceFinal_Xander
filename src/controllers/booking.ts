const checkAvailability = async (mongoDbService: any, serviceId: string, date: Date) => {
    const service = await mongoDbService.findById(serviceId);
    if (!service || !service.availability) return false;

    const availability = service.availability.find((avail: any) => {
        const availDate = new Date(avail.date);
        return availDate.toDateString() === date.toDateString();
    });

    if (!availability) return false;
    return availability.availableSlots > availability.bookedSlots;
}

const validateBookingData = (bookingData: any) => {
    const { serviceId, date } = bookingData;
    if (!serviceId || !date) {
        throw new Error('Service ID and date are required');
    }
    // For guests, name and email are required
    if (!bookingData.userId && (!bookingData.guestName || !bookingData.guestEmail)) {
        throw new Error('Guest name and email are required for guest bookings');
    }
}

export default {
    checkAvailability,
    validateBookingData
}