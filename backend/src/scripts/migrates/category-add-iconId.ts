import "dotenv/config";
import mongoose from 'mongoose';
import CategoryModel from '../../models/category.model';

async function migrate() {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      dbName: 'mern-stack-db',
    });

    const res = await CategoryModel.updateMany(
        { iconId: null},
        { $set: { iconId: '699c0abfe494ece10d075fe8' }}
    );

    console.log("Updated: ", res.modifiedCount);
    process.exit();
}

migrate();