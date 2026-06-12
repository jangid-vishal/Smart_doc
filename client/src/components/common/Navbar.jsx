import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../store/slices/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiUser, FiLogOut } from 'react-icons/fi'
import { FaHeartbeat } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Services', path: '/#services' },
  { name: 'Diseases', path: '/diseases' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/#contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileOpen(false)
      setDropdownOpen(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [location])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileOpen
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50'
          : 'bg-white/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between min-h-[4rem] py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow group-hover:shadow-lg transition-shadow duration-300">
                <FaHeartbeat className="text-white text-lg sm:text-xl" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-secondary-400 rounded-full animate-pulse-slow" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Smart
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-800">_Doc</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link text-sm ${
                  location.pathname === link.path ? 'nav-link-active' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 xl:px-4 xl:py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs xl:text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs xl:text-sm font-semibold text-gray-700">{user.name.split(' ')[0]}</span>
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-elevated border border-gray-100 overflow-hidden"
                    >
                      <Link
                        to={`/${user.role}-dashboard`}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <FiUser /> Dashboard
                      </Link>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-semibold text-primary-600 hover:text-primary-700 border-2 border-primary-200 hover:border-primary-300 rounded-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <FiLogIn className="text-sm xl:text-base" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-button shadow-md hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FiUserPlus className="text-sm xl:text-base" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? (
              <FiX className="text-2xl text-gray-700" />
            ) : (
              <FiMenu className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-elevated overflow-hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <div className="container-custom py-4 pb-8 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3.5 min-h-[44px] rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      to={`/${user.role}-dashboard`}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      <FiUser className="text-sm" /> Dashboard
                    </Link>
                    <button
                      onClick={onLogout}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors rounded-xl"
                    >
                      <FiLogOut className="text-sm" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-primary-600 border-2 border-primary-200 rounded-button"
                    >
                      <FiLogIn className="text-sm" /> Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-button"
                    >
                      <FiUserPlus className="text-sm" /> Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
