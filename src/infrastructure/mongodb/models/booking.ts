import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingModelSchema = new Schema({
  serviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'ServiceModel', required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  guestName: {type: String},
  guestEmail: {type: String},
  date: {type: Date, required: true},
  status: {type: String, required: true, enum: ['pending', 'confirmed', 'declined', 'cancelled'], default: 'pending'},
  notes: {type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

export const Booking = mongoose.model("BookingModel", BookingModelSchema);