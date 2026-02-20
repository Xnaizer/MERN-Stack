import "dotenv/config";
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import ImageModel from '../models/Image.model'; 

const mongoUri = process.env.MONGO_URI;
if(!mongoUri) throw new Error("MONGO_URI is missing")

const createdById = new mongoose.Types.ObjectId("69639adc4a21f316c50af381");
const randomCloudinaryUrl = () => {
    const id = faker.string.alphanumeric(20);
    return `https://res.cloudinary.com/demo/image/upload/v${faker.number.int({ min: 1000000000, max: 1999999999 })}/${id}.jpg`;
}

const statuses = ["temporary", "permanent"] as const;
const usedByList = ["category", "event", "post"] as const;

const generateImages = (count: number) => {
    return Array.from({ length: count }).map(() => ({
        url: randomCloudinaryUrl(),
        publicImgId: faker.string.alphanumeric(24),
        status: faker.helpers.arrayElement(statuses),
        usedBy: faker.helpers.arrayElement(usedByList),
        createdBy: createdById
    }))
}

const main = async () => {
  await mongoose.connect(mongoUri);

  const data = generateImages(50);

  await ImageModel.insertMany(data);

  console.log("Seed success");

  await mongoose.disconnect();
}

main();