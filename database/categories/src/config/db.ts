import mongoose from 'mongoose';

export const connectDB = async (mongoUri: string) => {
    try {
        await mongoose.connect(mongoUri);
        console.log(`Database connected!`);
    } catch (error) {
        console.error('Error occured: ' + error)
    }
}