import serviceQueries from '../infrastructure/mongodb/queries/service';

describe('Service Queries', () => {
  it('should create service', async () => {
    const mockSaved = { _id: '1', name: 'Hotel', type: 'hotel', toObject: () => ({ _id: '1', name: 'Hotel', type: 'hotel' }) };
    const mockModel = jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue(mockSaved),
    }));

    const result = await serviceQueries.createService(mockModel, { name: 'Hotel', type: 'hotel' });
    expect(result._id).toBe('1');
    expect(result.name).toBe('Hotel');
  });

  it('should get services', async () => {
    const mockModel = {
      find: jest.fn().mockResolvedValue([{ _id: '1', name: 'Hotel' }]),
    };

    const result = await serviceQueries.getServices(mockModel);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get service by id', async () => {
    const mockModel = {
      findById: jest.fn().mockResolvedValue({ _id: '1', name: 'Hotel' }),
    };

    const result = await serviceQueries.getServiceById(mockModel, '1');
    expect(result._id).toBe('1');
  });

  it('should update service availability', async () => {
    const mockService = {
      availability: [{ date: new Date('2023-12-25'), availableSlots: 5, bookedSlots: 2 }],
      save: jest.fn().mockResolvedValue(true),
    };

    const mockModel = {
      findById: jest.fn().mockResolvedValue(mockService),
    };

    const result = await serviceQueries.updateServiceAvailability(
      mockModel,
      'service1',
      new Date('2023-12-25'),
      1
    );
    expect(mockService.save).toHaveBeenCalled();
  });
});