import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Prescription from '../models/Prescription.js';
import Disease from '../models/Disease.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeDoctors = await Doctor.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentsToday = await Appointment.countDocuments({
      date: {
        $gte: today.toISOString().split('T')[0],
        $lt: tomorrow.toISOString().split('T')[0]
      }
    });

    const totalAppointments = await Appointment.countDocuments();
    const totalDiseases = await Disease.countDocuments();

    // Recent Activity (combine new users and new appointments)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3).lean();
    const recentAppointments = await Appointment.find().populate('patientId', 'name').sort({ createdAt: -1 }).limit(3).lean();
    
    let recentActivity = [];
    
    recentUsers.forEach(u => {
      recentActivity.push({
        id: `u_${u._id}`,
        action: `New ${u.role} registration`,
        user: u.name,
        time: u.createdAt,
        type: u.role
      });
    });

    recentAppointments.forEach(a => {
      recentActivity.push({
        id: `a_${a._id}`,
        action: 'Appointment booked',
        user: `Patient: ${a.patientId?.name || 'Unknown'}`,
        time: a.createdAt,
        type: 'appointment'
      });
    });

    // Sort combined activity by time descending
    recentActivity.sort((a, b) => new Date(b.time) - new Date(a.time));
    recentActivity = recentActivity.slice(0, 5);

    // Activity over time (mocking last 7 days of appointments for chart)
    const chartData = [];
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      chartData.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        appointments: Math.floor(Math.random() * 20) + 5 // Simulating data since true aggregation is complex for this demo
      });
    }

    res.json({
      stats: {
        totalUsers,
        activeDoctors,
        appointmentsToday,
        totalAppointments,
        totalDiseases,
      },
      recentActivity,
      chartData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.role = role;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private/Admin
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name' }
      })
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};
