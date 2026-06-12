import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiCalendar, FiClock, FiActivity, FiChevronRight, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { getAppointments, updateAppointmentStatus, reset } from '../../store/slices/appointmentSlice'

const DoctorDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { appointments, isLoading, isError, message } = useSelector(
    (state) => state.appointment
  )

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    dispatch(getAppointments())

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message])

  const handleStatusUpdate = (id, status) => {
    dispatch(updateAppointmentStatus({ id, status }))
  }

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date).toDateString()
    const today = new Date().toDateString()
    return aptDate === today
  })

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.length, icon: <FiCalendar />, color: 'text-primary-600', bg: 'bg-primary-100' },
    { label: 'Total Appointments', value: appointments.length, icon: <FiUsers />, color: 'text-secondary-600', bg: 'bg-secondary-100' },
    { label: 'Pending Approvals', value: appointments.filter(a => a.status === 'pending').length, icon: <FiActivity />, color: 'text-accent-600', bg: 'bg-accent-100' },
  ]

  const recentPatients = Array.from(new Set(appointments.filter(a => a.status === 'completed').map(a => JSON.stringify({
    id: a.patientId?._id,
    name: a.patientId?.name,
    lastVisit: new Date(a.date).toLocaleDateString(),
    condition: a.notes || 'Routine checkup'
  })))).map(p => JSON.parse(p)).slice(0, 5);

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
        {/* Main Content Area - All Appointments (or today's) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Appointments</h2>
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              View Calendar
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="mobile-table-wrap sm:overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px] sm:min-w-0">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                    <th className="py-4 px-6 font-medium">Date & Time</th>
                    <th className="py-4 px-6 font-medium">Patient Name</th>
                    <th className="py-4 px-6 font-medium">Notes</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                    <th className="py-4 px-6 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoading ? (
                     <tr>
                       <td colSpan="5" className="py-8 text-center">
                         <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                       </td>
                     </tr>
                  ) : appointments.length > 0 ? (
                    appointments.map((apt) => (
                      <tr key={apt._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 text-gray-900 font-medium">
                          <div className="flex flex-col">
                            <span className="text-gray-800">{new Date(apt.date).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <FiClock /> {apt.timeSlot}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                              {apt.patientId?.name?.charAt(0) || 'P'}
                            </div>
                            {apt.patientId?.name || 'Unknown Patient'}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600 text-xs max-w-[150px] truncate">
                          {apt.notes || 'No notes provided.'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                            apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            apt.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            {apt.status === 'pending' && (
                               <button onClick={() => handleStatusUpdate(apt._id, 'confirmed')} className="px-2 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded text-xs font-semibold transition-colors">
                                 Accept
                               </button>
                            )}
                            {apt.status === 'confirmed' && (
                              <button onClick={() => handleStatusUpdate(apt._id, 'completed')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip" title="Mark Completed">
                                <FiCheckCircle size={18} />
                              </button>
                            )}
                            {(apt.status === 'pending' || apt.status === 'confirmed') && (
                              <button onClick={() => handleStatusUpdate(apt._id, 'cancelled')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip" title="Cancel">
                                <FiXCircle size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar - Recent Patients */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Recent Patients</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentPatients.length > 0 ? recentPatients.map((patient, index) => (
                <div key={index} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      {patient.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{patient.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{patient.lastVisit}</span>
                    <FiChevronRight className="text-gray-400 group-hover:text-primary-500" />
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent patients found.</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white shadow-glow">
            <h3 className="text-lg font-bold mb-2">Clinic Announcements</h3>
            <p className="text-secondary-100 text-sm mb-4 leading-relaxed">
              Dr. {user?.name?.split(' ')[0] || 'Doctor'}, please remember to submit your monthly reports by the 30th.
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
              View All Notices
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
