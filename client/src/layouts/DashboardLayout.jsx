import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../store/slices/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMenu, FiX, FiHome, FiCalendar, FiUser, 
  FiSettings, FiLogOut, FiUsers, FiActivity, FiFileText
} from 'react-icons/fi'
import { FaHeartbeat } from 'react-icons/fa'

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      const firstName = user.name ? user.name.split(' ')[0] : 'User';
      const lastName = user.name ? user.name.split(' ').pop() : '';
      
      const timer = setTimeout(() => {
        if (user.role === 'admin') {
          setNotifications([
            { id: 1, title: 'Welcome Admin!', desc: `Hello ${firstName}, your admin dashboard is initialized and secure.`, time: 'Just now', read: false },
            { id: 2, title: 'System Activity Check', desc: 'MongoDB status: Connected and healthy.', time: '10 mins ago', read: false },
            { id: 3, title: 'System Backup Success', desc: 'Weekly database backup successfully completed.', time: '2 hours ago', read: true },
          ]);
        } else if (user.role === 'doctor') {
          setNotifications([
            { id: 1, title: `Welcome Dr. ${lastName}`, desc: `Hello Dr. ${lastName}, you have active appointments scheduled for today.`, time: 'Just now', read: false },
            { id: 2, title: 'New Appointment Booked', desc: 'A patient has booked a consultation slot on your schedule.', time: '15 mins ago', read: false },
            { id: 3, title: 'Prescription System Online', desc: 'Prescription digital signature has been successfully verified.', time: '1 day ago', read: true },
          ]);
        } else {
          setNotifications([
            { id: 1, title: `Welcome ${firstName}!`, desc: `Hi ${firstName}, welcome to Smart_Doc. You can search for doctors and book consults.`, time: 'Just now', read: false },
            { id: 2, title: 'Profile Status', desc: 'Your health profile setup is 100% complete.', time: '30 mins ago', read: false },
            { id: 3, title: 'Secure Session Active', desc: 'Logged in securely via cookie-based authentication.', time: '1 hour ago', read: true },
          ]);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!user) return []
    
    const commonLinks = [
      { name: 'Settings', path: `/${user.role}-dashboard/settings`, icon: <FiSettings /> },
    ]

    switch (user.role) {
      case 'patient':
        return [
          { name: 'Overview', path: '/patient-dashboard', icon: <FiHome /> },
          { name: 'My Appointments', path: '/patient-dashboard/appointments', icon: <FiCalendar /> },
          { name: 'Prescriptions', path: '/patient-dashboard/prescriptions', icon: <FiFileText /> },
          { name: 'Medical Records', path: '/patient-dashboard/records', icon: <FiFileText /> },
          { name: 'Find Doctors', path: '/doctors', icon: <FiUser /> },
          ...commonLinks
        ]
      case 'doctor':
        return [
          { name: 'Overview', path: '/doctor-dashboard', icon: <FiHome /> },
          { name: 'Appointments', path: '/doctor-dashboard/appointments', icon: <FiCalendar /> },
          { name: 'Prescriptions', path: '/doctor-dashboard/prescriptions', icon: <FiFileText /> },
          { name: 'My Patients', path: '/doctor-dashboard/patients', icon: <FiUsers /> },
          { name: 'Schedule', path: '/doctor-dashboard/schedule', icon: <FiActivity /> },
          ...commonLinks
        ]
      case 'admin':
        return [
          { name: 'Overview', path: '/admin-dashboard', icon: <FiHome /> },
          { name: 'Doctors', path: '/admin-dashboard/doctors', icon: <FiUser /> },
          { name: 'Patients', path: '/admin-dashboard/patients', icon: <FiUsers /> },
          { name: 'Appointments', path: '/admin-dashboard/appointments', icon: <FiCalendar /> },
          { name: 'Diseases DB', path: '/admin-dashboard/diseases', icon: <FiFileText /> },
          ...commonLinks
        ]
      default:
        return []
    }
  }

  const navLinks = getNavLinks()

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full z-20 shadow-sm">
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
              <FaHeartbeat className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold gradient-text">Smart_Doc</span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                  }`}
                >
                  <span className={`text-lg ${isActive ? 'text-primary-500' : 'text-gray-400'}`}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-50">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <FaHeartbeat className="text-white text-sm" />
                  </div>
                  <span className="text-lg font-bold gradient-text">Smart_Doc</span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="flex-1 py-6 px-4 overflow-y-auto">
                <nav className="space-y-1.5">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-lg ${isActive ? 'text-primary-500' : 'text-gray-400'}`}>
                          {link.icon}
                        </span>
                        {link.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
              <div className="p-4 border-t border-gray-50">
                <button
                  onClick={() => {
                    onLogout()
                    setIsSidebarOpen(false)
                  }}
                  className="flex items-center gap-3 px-4 py-3 w-full text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        {/* Top Header */}
        <header className="min-h-[4rem] sm:h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-10 gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <FiMenu className="text-2xl" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <h1 className="text-lg font-bold text-gray-900 sm:hidden">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="relative">
              <button 
                type="button" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none" 
                aria-label="Notifications"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        {notifications.some(n => !n.read) && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      
                      <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => toggleRead(n.id)}
                              className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50/70 transition-colors ${!n.read ? 'bg-primary-50/10' : ''}`}
                            >
                              <div className="mt-1 shrink-0">
                                <span className={`block w-2.5 h-2.5 rounded-full ${!n.read ? 'bg-primary-500' : 'bg-gray-200'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm text-gray-900 ${!n.read ? 'font-bold' : 'font-medium'}`}>
                                  {n.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                  {n.desc}
                                </p>
                                <span className="text-[10px] text-gray-400 mt-2 block font-medium">
                                  {n.time}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400">
                            No notifications yet
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 sm:gap-3 sm:pl-4 sm:border-l border-gray-200">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm shrink-0">
                {user?.name?.charAt(0)}
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 relative overflow-x-hidden">
          <div className="absolute inset-0 bg-mesh-gradient opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
