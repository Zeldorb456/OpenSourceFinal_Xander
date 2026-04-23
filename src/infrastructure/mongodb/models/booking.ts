// Require Mongoose
import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema;

const BookingModelSchema = new Schema({
  serviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'ServiceModel', required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}, // null for guests
  guestName: {type: String}, // for guests
  guestEmail: {type: String}, // for guests
  date: {type: Date, required: true},
  status: {type: String, required: true, enum: ['pending', 'confirmed', 'declined', 'cancelled'], default: 'pending'},
  notes: {type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

// Compile model from schema
export const Booking = mongoose.model("BookingModel", BookingModelSchema);