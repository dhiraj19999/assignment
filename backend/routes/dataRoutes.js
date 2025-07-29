
import express from 'express';
import { getAllData, uploadFromFile } from '../controllers/dataController.js';

const router = express.Router();

router.get('/', getAllData);
router.post('/upload', uploadFromFile); 

export default router;
