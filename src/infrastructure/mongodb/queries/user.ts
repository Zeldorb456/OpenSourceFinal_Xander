import mongoose from 'mongoose';

const createUser = async (mongoDbUser: any, userData: any) =>
{
  const result = await new mongoDbUser({
    _id: new mongoose.Types.ObjectId(),
    ...userData,
  }).save();
  return result.toObject();
}

const getUserByUsername = async (mongoDbUser: any, userName: string) =>
{
  const user = await mongoDbUser.findOne({ userName });
  return user;
}

const getUserById = async (mongoDbUser: any, userId: string) =>
{
  const user = await mongoDbUser.findById(userId);
  return user;
}

export default  {
  createUser,
  getUserByUsername,
  getUserById,
};