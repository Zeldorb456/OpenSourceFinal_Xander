import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ServiceModelSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true, enum: ['hotel', 'transportation', 'car_rental', 'appointment', 'reservation', 'service']},
  description: {type: String},
  price: {type: Number, required: true},
  availability: [{
    date: {type: Date, required: true},
    availableSlots: {type: Number, required: true, default: 1},
    bookedSlots: {type: Number, default: 0}
  }],
  createdAt: {type: Date, default: Date.now}
});

export const Service = mongoose.model("ServiceModel", ServiceModelSchema);

