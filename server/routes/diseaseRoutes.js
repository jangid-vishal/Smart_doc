import express from 'express';
import { getDiseases, getDiseaseById } from '../controllers/diseaseController.js';

const router = express.Router();

router.route('/').get(getDiseases);
router.route('/:id').get(getDiseaseById);

export default router;
