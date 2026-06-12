import express from 'express';
import {
  getDoctors,
  getDoctorById,
  upsertDoctorProfile,
} from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getDoctors);
router.route('/profile').post(protect, authorize('doctor', 'admin'), upsertDoctorProfile);
router.route('/:id').get(getDoctorById);

export default router;
