import mongoose from "mongoose";

export const connectDB = async (mongoUri: string) => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  });

  await mongoose.connection.asPromise();
  process.stdout.write("Database connected!\n");
};
