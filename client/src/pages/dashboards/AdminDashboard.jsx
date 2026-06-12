import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiUsers, FiUserCheck, FiActivity, FiCalendar, FiClock, FiSettings, FiFileText, FiTrendingUp } from 'react-icons/fi'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getDashboardStats } from '../../store/slices/adminSlice'
import { useToast } from '../../context/ToastContext'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  
  const { stats: dashboardData, isLoading, isError, message } = useSelector(
    (state) => state.admin
  )

  useEffect(() => {
    if (isError) {
      addToast(message, 'error')
    }
    dispatch(getDashboardStats())
  }, [dispatch, isError, message, addToast])

  const stats = dashboardData?.stats ? [
    { label: 'Total Users', value: dashboardData.stats.totalUsers, icon: <FiUsers />, color: 'text-primary-600', bg: 'bg-primary-100', trend: '+12%' },
    { label: 'Active Doctors', value: dashboardData.stats.activeDoctors, icon: <FiUserCheck />, color: 'text-secondary-600', bg: 'bg-secondary-100', trend: '+2' },
    { label: 'Appointments Today', value: dashboardData.stats.appointmentsToday, icon: <FiActivity />, color: 'text-accent-600', bg: 'bg-accent-100', trend: '+18%' },
    { label: 'Total Appointments', value: dashboardData.stats.totalAppointments, icon: <FiCalendar />, color: 'text-green-600', bg: 'bg-green-100', trend: '+5%' },
  ] : []

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <span className="flex items-center text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  <FiTrendingUp className="mr-1" />
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - System Activity Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Platform Activity</h3>
              <select className="text-sm border-gray-200 rounded-lg text-gray-600 focus:ring-primary-500 focus:border-primary-500">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            
            <div className="flex-1 w-full h-full min-h-0">
              {dashboardData?.chartData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAppointments)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Recent Activity Log */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Activity Log</h3>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {dashboardData?.recentActivity ? dashboardData.recentActivity.map((activity) => (
                <div key={activity._id || activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-100 text-primary-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                    {activity.type === 'doctor' && <FiUserCheck size={16} />}
                    {activity.type === 'appointment' && <FiCalendar size={16} />}
                    {activity.type === 'admin' && <FiSettings size={16} />}
                    {activity.type === 'patient' && <FiUsers size={16} />}
                    {activity.type === 'review' && <FiFileText size={16} />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{activity.action}</span>
                      <span className="text-xs font-medium text-gray-600 mt-1">{activity.user}</span>
                      <time className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <FiClock /> {new Date(activity.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </time>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4 text-gray-500 text-sm">Loading activity...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
