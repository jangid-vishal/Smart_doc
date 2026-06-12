import express from 'express';
import {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('patient', 'admin'), bookAppointment);

router.route('/myappointments')
  .get(protect, getMyAppointments);

router.route('/:id/status')
  .put(protect, authorize('doctor', 'admin'), updateAppointmentStatus);

export default router;
