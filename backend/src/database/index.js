import mongoose from 'mongoose';


export const connectDB = async () => {
   const url=process.env.DATABASE;
   try {
      const connect=await mongoose.connect(`${url}`);
      console.log('MongoDB connected successfully');
      return connect;
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
   }
   }