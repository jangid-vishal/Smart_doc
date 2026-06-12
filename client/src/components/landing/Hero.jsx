import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiShield, FiClock } from 'react-icons/fi'
import { FaUserMd, FaHospital, FaStethoscope } from 'react-icons/fa'

const floatingCards = [
  { icon: <FaUserMd />, label: '500+ Doctors', color: 'from-primary-500 to-primary-600', pos: 'top-24 right-8 md:right-16 lg:right-24' },
  { icon: <FiShield />, label: 'Secure Platform', color: 'from-secondary-500 to-secondary-600', pos: 'bottom-32 right-4 md:right-12 lg:right-20' },
  { icon: <FiClock />, label: '24/7 Support', color: 'from-accent-500 to-accent-600', pos: 'top-48 right-2 md:right-4 lg:right-8' },
]

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-100/20 rounded-full blur-3xl" />

        {/* Decorative Dots Grid */}
        <div className="absolute top-20 left-10 grid grid-cols-5 gap-3 opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
          ))}
        </div>

        {/* Floating Cross Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-32 right-1/3 opacity-10"
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect x="22" y="0" width="16" height="60" rx="8" fill="#3b82f6" />
            <rect x="0" y="22" width="60" height="16" rx="8" fill="#3b82f6" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-40 left-1/4 opacity-10"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="15" y="0" width="10" height="40" rx="5" fill="#10b981" />
            <rect x="0" y="15" width="40" height="10" rx="5" fill="#10b981" />
          </svg>
        </motion.div>
      </div>

      <div className="container-custom relative z-10 pt-28 sm:pt-32 pb-20 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-700">
                #1 Healthcare Platform
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6">
              <span className="text-gray-900">Your Health,</span>
              <br />
              <span className="gradient-text">Our Priority</span>
              <br />
              <span className="text-gray-900">Smart Care</span>
            </h1>

            <p className="text-base sm:text-lg text-surface-500 leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Experience next-generation healthcare management. Book appointments,
              consult top specialists, manage prescriptions, and take control of
              your health journey — all from one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link to="/doctors" className="btn-primary flex items-center justify-center gap-2 text-base w-full sm:w-auto">
                Find a Doctor
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/signup" className="btn-secondary flex items-center justify-center gap-2 text-base w-full sm:w-auto">
                <FiCalendar />
                Book Appointment
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200/60">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-primary-400', 'bg-secondary-400', 'bg-accent-400', 'bg-orange-400'].map((color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">50K+ Patients</p>
                  <p className="text-xs text-surface-400">Trust Smart_Doc</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-800">4.9/5</p>
                <p className="text-xs text-surface-400">Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side — Illustration & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Illustration Circle */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/80 to-secondary-100/80 rounded-full" />
              <div className="absolute inset-4 bg-gradient-to-br from-primary-50 to-white rounded-full shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <FaStethoscope className="text-7xl text-primary-400 mx-auto mb-4 animate-pulse-slow" />
                  <FaHospital className="text-5xl text-secondary-400 mx-auto" />
                </div>
              </div>

              {/* Orbiting Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-200/40 animate-spin-slow" />

              {/* Floating Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className={`absolute ${card.pos}`}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-elevated border border-gray-100/50"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-lg`}>
                      {card.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      {card.label}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 54C96 48 192 36 288 36C384 36 480 48 576 54C672 60 768 60 864 54C960 48 1056 36 1152 30C1248 24 1344 24 1392 24L1440 24V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
