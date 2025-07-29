import fs from 'fs';
import Data from '../models/Data.js';


export const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const uploadFromFile = async (req, res) => {
  try {
    const jsonData = JSON.parse(fs.readFileSync('./jsondata.json', 'utf-8'));

    
    await Data.deleteMany();

   
    await Data.insertMany(jsonData);

    res.status(201).json({ message: ' JSON file data uploaded successfully!' });
  } catch (error) {
    console.error(' Upload error:', error);
    res.status(500).json({ message: 'Failed to upload from file' });
  }
};
