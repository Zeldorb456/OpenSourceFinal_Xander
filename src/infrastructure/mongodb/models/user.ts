import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  userPassword: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true, enum: ['user', 'admin'], default: 'user'},
  createdAt: {type: Date, default: Date.now}
});

export const User = mongoose.model("UserModel", UserModelSchema);