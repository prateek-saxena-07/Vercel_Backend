import mongoose from 'mongoose';

mongoose.set("strictQuery", true);

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose connected:${conn.connection.host}`);
    }
    catch (error)
    {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }

}
