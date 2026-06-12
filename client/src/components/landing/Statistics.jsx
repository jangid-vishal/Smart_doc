import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaUserMd, FaUsers, FaCalendarCheck, FaSmile } from 'react-icons/fa'

const stats = [
  {
    icon: <FaUsers />,
    value: 50000,
    suffix: '+',
    label: 'Happy Patients',
    description: 'Trusted by thousands',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-500',
  },
  {
    icon: <FaUserMd />,
    value: 500,
    suffix: '+',
    label: 'Expert Doctors',
    description: 'Across 40+ specialties',
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'bg-secondary-50',
    iconColor: 'text-secondary-500',
  },
  {
    icon: <FaCalendarCheck />,
    value: 120000,
    suffix: '+',
    label: 'Appointments',
    description: 'Successfully completed',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-500',
  },
  {
    icon: <FaSmile />,
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    description: 'Patient happiness score',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
]

/* Simple animated counter without external deps */
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  const formatted = count >= 1000 ? count.toLocaleString() : count
  return <span ref={ref}>{formatted}{suffix}</span>
}

const Statistics = () => {
  return (
    <section className="py-20 bg-white relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full mb-4">
            Our Impact
          </span>
          <h2 className="section-title">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="section-subtitle">
            Numbers that reflect our commitment to delivering exceptional healthcare services
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card group text-center"
            >
              {/* Gradient Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-card opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`text-2xl ${stat.iconColor}`}>{stat.icon}</span>
              </div>

              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-surface-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics
