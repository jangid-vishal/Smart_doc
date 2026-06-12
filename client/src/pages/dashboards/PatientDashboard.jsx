import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiFileText, FiPlus, FiChevronRight } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAppointments, reset as resetAppointments } from '../../store/slices/appointmentSlice'
import { getMyPrescriptions, reset as resetPrescriptions } from '../../store/slices/prescriptionSlice'
import { formatDoctorName } from '../../utils/formatDoctorName'

const PatientDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { appointments, isLoading, isError, message } = useSelector(
    (state) => state.appointment
  )
  const { prescriptions, isError: isPrescriptionError, message: prescriptionMessage } = useSelector(
    (state) => state.prescription
  )

  useEffect(() => {
    if (isError) console.error(message)
    if (isPrescriptionError) console.error(prescriptionMessage)

    dispatch(getAppointments())
    dispatch(getMyPrescriptions())

    return () => {
      dispatch(resetAppointments())
      dispatch(resetPrescriptions())
    }
  }, [dispatch, isError, message, isPrescriptionError, prescriptionMessage])

  const stats = [
    { label: 'Upcoming Appointments', value: appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').length, icon: <FiCalendar />, color: 'text-primary-600', bg: 'bg-primary-100' },
    { label: 'Total Visits', value: appointments.filter(a => a.status === 'completed').length, icon: <FiClock />, color: 'text-secondary-600', bg: 'bg-secondary-100' },
    { label: 'Medical Records', value: prescriptions?.length || 0, icon: <FiFileText />, color: 'text-accent-600', bg: 'bg-accent-100' },
  ]

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
            <Link to="/doctors" className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              <FiPlus /> Book New
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              </div>
            ) : appointments.length > 0 ? (
              appointments.map((apt, index) => (
                <motion.div
                  key={apt._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-5 items-start sm:items-center transition-all hover:shadow-md"
                >
                  {apt.doctorId?.userId?.avatar ? (
                     <img src={apt.doctorId.userId.avatar} alt={apt.doctorId.userId.name} className="w-16 h-16 rounded-xl object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
                      {apt.doctorId?.userId?.name?.charAt(0) || 'D'}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{formatDoctorName(apt.doctorId?.userId?.name) || 'Unknown'}</h3>
                    <p className="text-sm text-primary-600 font-medium mb-2">{apt.doctorId?.specialization || 'Specialist'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(apt.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><FiClock /> {apt.timeSlot}</span>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold w-full sm:w-auto text-center capitalize ${
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {apt.status}
                    </span>
                    {(apt.status === 'pending' || apt.status === 'confirmed') && (
                      <button className="btn-outline w-full sm:w-auto px-4 py-1.5 text-sm">Reschedule</button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <FiCalendar className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No upcoming appointments found.</p>
                <Link to="/doctors" className="text-primary-600 text-sm hover:underline mt-2 inline-block">Browse Doctors to book one</Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Recent Records & Profile info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-glow">
            <h3 className="text-lg font-bold mb-1">Health Profile</h3>
            <p className="text-primary-100 text-sm mb-4">Your medical information is up to date.</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b border-primary-400/30 pb-2">
                <span className="text-primary-100">Blood Type</span>
                <span className="font-semibold">{user?.bloodType || 'Not Set'}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-primary-400/30 pb-2">
                <span className="text-primary-100">Height</span>
                <span className="font-semibold">{user?.height || 'Not Set'}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-primary-400/30 pb-2">
                <span className="text-primary-100">Weight</span>
                <span className="font-semibold">{user?.weight || 'Not Set'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-100">Allergies</span>
                <span className="font-semibold truncate max-w-[120px]" title={user?.allergies?.join(', ')}>
                  {user?.allergies?.length > 0 ? user.allergies.join(', ') : 'None'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Recent Records</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {prescriptions?.slice(0, 3).map((record) => (
                <div key={record._id} className="group flex items-start gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    <FiFileText />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors">{record.diagnosis}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span className="truncate">{formatDoctorName(record.doctorId?.userId?.name) || 'Doctor'}</span>
                    </div>
                  </div>
                  <FiChevronRight className="text-gray-400 group-hover:text-primary-500" />
                </div>
              ))}
              {prescriptions?.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No records found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
