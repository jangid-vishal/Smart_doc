import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCheckCircle, FiCalendar, FiClock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment, reset as resetAppointment } from '../../store/slices/appointmentSlice';
import { formatDoctorName } from '../../utils/formatDoctorName';

const AppointmentBookingModal = ({ doctor, onClose }) => {
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState({ date: '', timeSlot: '', notes: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const displayName = formatDoctorName(doctor?.userId?.name);

  const { isSuccess: isBookingSuccess, isLoading: isBookingLoading, isError: isBookingError, message: bookingMessage } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (isBookingSuccess) {
      const successTimer = setTimeout(() => {
        setShowSuccess(true);
      }, 0);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        dispatch(resetAppointment());
        onClose();
      }, 3000);
      return () => {
        clearTimeout(successTimer);
        clearTimeout(timer);
      };
    }
  }, [isBookingSuccess, dispatch, onClose]);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.timeSlot) return;

    dispatch(bookAppointment({
      doctorId: doctor._id,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      notes: bookingData.notes,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 md:p-8 w-full max-w-lg sm:max-w-md shadow-2xl relative max-h-[92vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <FiX size={22} />
        </button>

        {showSuccess ? (
          <div className="text-center py-8 sm:py-10 px-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6"
            >
              <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Your appointment with {displayName} has been successfully scheduled.
            </p>
          </div>
        ) : (
          <>
            <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 pr-10">
              Book Appointment
            </h2>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-100 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center font-bold text-lg overflow-hidden">
                {doctor?.userId?.avatar ? (
                  <img src={doctor.userId.avatar} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  formatDoctorName(doctor?.userId?.name, { withPrefix: false }).charAt(0) || 'D'
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 truncate text-base sm:text-lg">{displayName}</h4>
                <p className="text-sm text-primary-600 font-medium capitalize truncate">{doctor?.specialization}</p>
              </div>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4 sm:space-y-5">
              {isBookingError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                  {bookingMessage}
                </div>
              )}

              <div>
                <label htmlFor="booking-date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="booking-date"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-700 text-base min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-time" className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Slot
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    id="booking-time"
                    required
                    value={bookingData.timeSlot}
                    onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-700 appearance-none text-base min-h-[48px]"
                  >
                    <option value="" disabled>Select a time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="booking-notes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  placeholder="Briefly describe your symptoms..."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-700 resize-none text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isBookingLoading}
                className="w-full btn-primary py-3.5 rounded-xl shadow-glow mt-2 sm:mt-4 disabled:opacity-70 min-h-[48px] text-base"
              >
                {isBookingLoading ? 'Processing...' : 'Confirm Appointment'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppointmentBookingModal;
