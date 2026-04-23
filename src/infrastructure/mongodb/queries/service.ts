import mongoose from 'mongoose';

const createService = async (mongoDbService: any, serviceData: any) =>
{
  const result = await new mongoDbService({
    _id: new mongoose.Types.ObjectId(),
    ...serviceData,
  }).save();
  return result.toObject();
}

const getServices = async (mongoDbService: any) =>
{
  const services = await mongoDbService.find({});
  return services;
}

const getServiceById = async (mongoDbService: any, serviceId: string) =>
{
  const service = await mongoDbService.findById(serviceId);
  return service;
}

const updateServiceAvailability = async (mongoDbService: any, serviceId: string, date: Date, bookedSlots: number) =>
{
  const service = await mongoDbService.findById(serviceId);
  if (!service || !service.availability) {
    throw new Error('Service not found or not available');
  }

  const availabilityIndex = service.availability.findIndex((avail: any) => {
    const availDate = new Date(avail.date);
    return availDate.toDateString() === date.toDateString();
  });

  if (availabilityIndex !== -1) {
    service.availability[availabilityIndex].bookedSlots += bookedSlots;
    await service.save();
  } else {
    throw new Error('Availability date not found for service');
  }
  return service;
}

export default  {
  createService,
  getServices,
  getServiceById,
  updateServiceAvailability,
}