// Require Mongoose
import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  userPassword: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true, enum: ['user', 'admin'], default: 'user'},
  createdAt: {type: Date, default: Date.now}
});

// Compile model from schema
export const User = mongoose.model("UserModel", UserModelSchema);