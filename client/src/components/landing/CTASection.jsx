import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const features = [
  'Book appointments in seconds',
  'Access prescriptions anytime',
  'Browse 500+ expert doctors',
  'Track your health history',
]

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Start Your Health
              <br />
              <span className="text-secondary-300">Journey Today</span>
            </h2>

            <p className="text-lg text-primary-100 leading-relaxed mb-8 max-w-md">
              Join thousands of patients who trust Smart_Doc for their healthcare needs.
              It&apos;s free to get started.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <FiCheckCircle className="text-secondary-300 flex-shrink-0" />
                  <span className="text-sm text-primary-100">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-button shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started Free
                <FiArrowRight />
              </Link>
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-white font-semibold rounded-button border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
              >
                Browse Doctors
              </Link>
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '50K+', label: 'Active Users', desc: 'Growing daily' },
              { value: '4.9★', label: 'App Rating', desc: 'On all platforms' },
              { value: '99.9%', label: 'Uptime', desc: 'Reliable service' },
              { value: '2 min', label: 'Avg. Booking', desc: 'Quick & easy' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-card p-5 border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-primary-100 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-primary-200">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
