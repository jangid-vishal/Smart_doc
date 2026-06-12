import { motion } from 'framer-motion'
import {
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaAmbulance,
  FaPills,
  FaXRay,
} from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

const services = [
  {
    icon: <FaStethoscope />,
    title: 'General Checkup',
    description: 'Comprehensive health assessments with our experienced general physicians for preventive care.',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-500',
    hoverBorder: 'hover:border-primary-200',
  },
  {
    icon: <FaHeartbeat />,
    title: 'Cardiology',
    description: 'Expert cardiac care with advanced diagnostics, ECG monitoring, and heart health management.',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-500',
    hoverBorder: 'hover:border-rose-200',
  },
  {
    icon: <FaBrain />,
    title: 'Neurology',
    description: 'Specialized brain and nervous system care with cutting-edge diagnostic tools and treatments.',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50',
    iconColor: 'text-accent-500',
    hoverBorder: 'hover:border-accent-200',
  },
  {
    icon: <FaAmbulance />,
    title: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response teams and state-of-the-art facilities.',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    hoverBorder: 'hover:border-orange-200',
  },
  {
    icon: <FaPills />,
    title: 'Pharmacy',
    description: 'Online prescription management and medication delivery with pharmacist consultations.',
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'bg-secondary-50',
    iconColor: 'text-secondary-500',
    hoverBorder: 'hover:border-secondary-200',
  },
  {
    icon: <FaXRay />,
    title: 'Diagnostics',
    description: 'Advanced imaging and lab services including X-ray, MRI, CT scan, and blood work.',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
    hoverBorder: 'hover:border-cyan-200',
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20 bg-surface-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-100/30 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary-50 text-secondary-600 text-sm font-semibold rounded-full mb-4">
            Our Services
          </span>
          <h2 className="section-title">
            Comprehensive <span className="gradient-text">Healthcare</span> Services
          </h2>
          <p className="section-subtitle">
            From routine checkups to specialized treatments, we provide a full spectrum of medical services
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-white rounded-card p-6 border border-gray-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 ${service.hoverBorder} cursor-pointer`}
            >
              {/* Top Gradient Line */}
              <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${service.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`text-2xl ${service.iconColor}`}>{service.icon}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-surface-400 leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center gap-1 text-sm font-semibold text-primary-500 group-hover:text-primary-600 transition-colors">
                <span>Learn More</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
