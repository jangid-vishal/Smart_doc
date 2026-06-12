import express from 'express';
import {
  createPrescription,
  getMyPrescriptions,
  getIssuedPrescriptions
} from '../controllers/prescriptionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('doctor'), createPrescription);

router.route('/my')
  .get(protect, getMyPrescriptions);

router.route('/issued')
  .get(protect, authorize('doctor'), getIssuedPrescriptions);

export default router;
