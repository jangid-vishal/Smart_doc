import Doctor from '../models/Doctor.js';

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res, next) => {
  try {
    const { search, specialization } = req.query;
    
    let query = {};
    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    const doctors = await Doctor.find(query)
      .populate({
        path: 'userId',
        select: 'name email avatar',
        match: search ? { name: { $regex: search, $options: 'i' } } : {}
      });

    // Filter out doctors where userId didn't match the search (mongoose populate match returns null)
    const filteredDoctors = doctors.filter(doc => doc.userId !== null);
    
    res.json(filteredDoctors);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email avatar phone');

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404);
      throw new Error('Doctor not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update doctor profile
// @route   POST /api/doctors/profile
// @access  Private/Doctor
export const upsertDoctorProfile = async (req, res, next) => {
  try {
    const {
      specialization,
      experience,
      qualifications,
      bio,
      fees,
      hospital,
      availability
    } = req.body;

    let doctor = await Doctor.findOne({ userId: req.user._id });

    if (doctor) {
      // Update
      doctor.specialization = specialization || doctor.specialization;
      doctor.experience = experience || doctor.experience;
      doctor.qualifications = qualifications || doctor.qualifications;
      doctor.bio = bio || doctor.bio;
      doctor.fees = fees || doctor.fees;
      doctor.hospital = hospital || doctor.hospital;
      if (availability) doctor.availability = availability;

      const updatedDoctor = await doctor.save();
      res.json(updatedDoctor);
    } else {
      // Create
      doctor = await Doctor.create({
        userId: req.user._id,
        specialization,
        experience,
        qualifications,
        bio,
        fees,
        hospital,
        availability
      });
      res.status(201).json(doctor);
    }
  } catch (error) {
    next(error);
  }
};
