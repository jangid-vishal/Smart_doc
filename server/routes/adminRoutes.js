import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllAppointments
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/stats').get(protect, authorize('admin'), getDashboardStats);
router.route('/users').get(protect, authorize('admin'), getAllUsers);
router.route('/users/:id')
  .delete(protect, authorize('admin'), deleteUser);
router.route('/users/:id/role')
  .put(protect, authorize('admin'), updateUserRole);
router.route('/appointments').get(protect, authorize('admin'), getAllAppointments);

export default router;
