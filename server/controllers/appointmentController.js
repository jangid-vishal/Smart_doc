import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private/Patient
export const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, date, timeSlot, notes } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      res.status(400);
      throw new Error('Time slot is already booked');
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      date,
      timeSlot,
      notes,
    });

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/myappointments
// @access  Private
export const getMyAppointments = async (req, res, next) => {
  try {
    let appointments;

    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        res.status(404);
        throw new Error('Doctor profile not found');
      }
      appointments = await Appointment.find({ doctorId: doctor._id })
        .populate('patientId', 'name email phone avatar')
        .sort({ date: 1, timeSlot: 1 });
    } else {
      appointments = await Appointment.find({ patientId: req.user._id })
        .populate({
          path: 'doctorId',
          populate: { path: 'userId', select: 'name email phone avatar' }
        })
        .sort({ date: 1, timeSlot: 1 });
    }

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private/Doctor/Admin
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    // Verify ownership if doctor
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (appointment.doctorId.toString() !== doctor._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this appointment');
      }
    }

    appointment.status = status;
    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};
