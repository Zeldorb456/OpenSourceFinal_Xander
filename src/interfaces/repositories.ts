export interface IServiceRepository {
  create(serviceData: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any>;
  updateAvailability(id: string, date: Date, bookedSlots: number): Promise<any>;
}

export interface IBookingRepository {
  create(bookingData: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any>;
  updateStatus(id: string, status: string): Promise<any>;
  findByUser(userId: string): Promise<any[]>;
}

export interface IUserRepository {
  create(userData: any): Promise<any>;
  findByUsername(userName: string): Promise<any>;
  findById(id: string): Promise<any>;
}