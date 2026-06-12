import Prescription from '../models/Prescription.js';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private/Doctor
export const createPrescription = async (req, res, next) => {
  try {
    const { appointmentId, patientId, diagnosis, medications, notes, instructions } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor profile not found');
    }

    // Verify appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    const prescription = await Prescription.create({
      appointmentId,
      doctorId: doctor._id,
      patientId,
      diagnosis,
      medications,
      notes,
      instructions
    });

    res.status(201).json(prescription);
  } catch (error) {
    next(error);
  }
};

// @desc    Get prescriptions for a patient
// @route   GET /api/prescriptions/my
// @access  Private
export const getMyPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user._id })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email phone avatar' }
      })
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    next(error);
  }
};

// @desc    Get prescriptions issued by a doctor
// @route   GET /api/prescriptions/issued
// @access  Private/Doctor
export const getIssuedPrescriptions = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor profile not found');
    }

    const prescriptions = await Prescription.find({ doctorId: doctor._id })
      .populate('patientId', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (error) {
    next(error);
  }
};
