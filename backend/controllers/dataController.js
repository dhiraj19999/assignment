import fs from 'fs';
import Data from '../models/Data.js';

// GET all data
export const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST to load JSON file and store in MongoDB
export const uploadFromFile = async (req, res) => {
  try {
    const jsonData = JSON.parse(fs.readFileSync('./jsondata.json', 'utf-8'));

    // Optional: Clear old data
    await Data.deleteMany();

    // Insert new data
    await Data.insertMany(jsonData);

    res.status(201).json({ message: ' JSON file data uploaded successfully!' });
  } catch (error) {
    console.error(' Upload error:', error);
    res.status(500).json({ message: 'Failed to upload from file' });
  }
};
