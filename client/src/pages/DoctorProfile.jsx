import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorById } from '../store/slices/doctorSlice';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiClock, FiMail, FiAward, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import AppointmentBookingModal from '../components/doctors/AppointmentBookingModal';
import { formatDoctorName } from '../utils/formatDoctorName';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { doctorDetails: doctor, isLoading, isError, message } = useSelector((state) => state.doctor);
  const { user } = useSelector((state) => state.auth);
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    dispatch(getDoctorById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !doctor) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h2>
        <p className="text-gray-500 mb-6">{message || "We couldn't find the doctor you're looking for."}</p>
        <button onClick={() => navigate('/doctors')} className="btn-primary px-6 py-2 rounded-xl">
          Back to Doctors
        </button>
      </div>
    );
  }

  const displayName = formatDoctorName(doctor.userId?.name);
  const firstName = formatDoctorName(doctor.userId?.name, { withPrefix: false }).split(' ')[0] || 'Doctor';

  return (
    <div className="min-h-screen bg-gray-50 pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="container-custom">
        <button 
          onClick={() => navigate('/doctors')}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-semibold mb-6 transition-colors"
        >
          <FiArrowLeft /> Back to directory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-bl-[100px] -z-0 opacity-50"></div>
              
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 shadow-md relative z-10 bg-primary-100 flex items-center justify-center text-primary-600 text-5xl font-bold">
                {doctor.userId?.avatar ? (
                  <img src={doctor.userId.avatar} alt={doctor.userId.name} className="w-full h-full object-cover" />
                ) : (
                  doctor.userId?.name?.charAt(0) || 'D'
                )}
              </div>

              <div className="flex-1 relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
                      {displayName}
                      {doctor.isVerified && <FiCheckCircle className="text-blue-500 text-xl shrink-0" title="Verified Doctor" />}
                    </h1>
                    <p className="text-lg sm:text-xl text-primary-600 font-semibold capitalize">{doctor.specialization}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg font-bold text-lg">
                    <FiStar className="fill-current" /> {doctor.rating?.toFixed(1) || '4.8'}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium mb-6">
                  <span className="flex items-center gap-1.5"><FiAward /> {doctor.experience} Years Exp.</span>
                  <span className="flex items-center gap-1.5"><FiMapPin /> {doctor.hospital || 'Smart Care Hospital'}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {doctor.qualifications?.map((qual, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase">
                      {qual}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {firstName}</h2>
              <p className="text-gray-600 leading-relaxed">
                {doctor.bio || `${displayName} is a highly experienced ${doctor.specialization} with over ${doctor.experience} years of clinical experience. Dedicated to providing the best patient care and leveraging modern medical advancements.`}
              </p>
            </motion.div>

            {/* Reviews (Mocked for now) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Patient Feedback <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">24</span>
              </h2>
              
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">Anonymous Patient</p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Excellent doctor! Very attentive and explained everything clearly. Highly recommend for anyone looking for a specialist.</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 lg:sticky lg:top-28"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <span className="text-gray-500 font-semibold">Consultation Fee</span>
                <span className="text-2xl font-bold text-gray-900">${doctor.fees ?? 0}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FiClock className="text-primary-500 mt-1" size={18} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">Available Timings</p>
                    <p className="text-sm text-gray-600">Mon - Fri: 09:00 AM - 05:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiMail className="text-primary-500 mt-1" size={18} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">Contact</p>
                    <p className="text-sm text-gray-600">{doctor.userId?.email}</p>
                  </div>
                </div>
              </div>

              {user?.role === 'patient' ? (
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full btn-primary py-3 rounded-xl shadow-glow text-lg font-bold"
                >
                  Book Appointment
                </button>
              ) : user ? (
                <div className="text-center p-3 bg-orange-50 text-orange-600 rounded-xl text-sm font-semibold">
                  Log in as a patient to book
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full btn-primary py-3 rounded-xl shadow-glow text-lg font-bold"
                >
                  Login to Book
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {isBookingOpen && (
        <AppointmentBookingModal doctor={doctor} onClose={() => setIsBookingOpen(false)} />
      )}
    </div>
  );
};

export default DoctorProfile;
