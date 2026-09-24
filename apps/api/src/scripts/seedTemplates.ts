import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Template from '../models/Template';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const templates = [
  {
    title: 'Victory Day Special (Classic)',
    occasionType: 'Victory Day',
    // Using some generic placeholders for template thumbnails
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    layoutConfig: {
      templateFile: 'victory-day.html',
      slots: {
        headline: 'string',
        userName: 'string',
        userDesignation: 'string',
        userPhoto: 'image',
        leader1: 'image',
        leader2: 'image'
      }
    },
    isActive: true,
  },
  {
    title: 'Tribute / Condolence',
    occasionType: 'Condolence',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    layoutConfig: {
      templateFile: 'condolence.html',
      slots: {
        headline: 'string',
        userName: 'string',
        userDesignation: 'string',
        userPhoto: 'image',
        leader1: 'image',
      }
    },
    isActive: true,
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI is not set');

    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');
    
    await Template.deleteMany({});
    console.log('Cleared existing templates');
    
    await Template.insertMany(templates);
    console.log('Templates seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
}

seed();
