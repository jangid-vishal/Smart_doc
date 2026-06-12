import { Link } from 'react-router-dom'
import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

const quickLinks = [
  { name: 'About Us', path: '/' },
  { name: 'Find Doctors', path: '/doctors' },
  { name: 'Book Appointment', path: '/signup' },
  { name: 'Health Blogs', path: '/blogs' },
  { name: 'Contact Us', path: '/#contact' },
]

const serviceLinks = [
  { name: 'General Checkup', path: '/doctors' },
  { name: 'Cardiology', path: '/doctors' },
  { name: 'Neurology', path: '/doctors' },
  { name: 'Disease Info', path: '/diseases' },
  { name: 'Patient Portal', path: '/login' },
]

const socialLinks = [
  { icon: <FaFacebookF />, url: '#', color: 'hover:bg-blue-600' },
  { icon: <FaTwitter />, url: '#', color: 'hover:bg-sky-500' },
  { icon: <FaInstagram />, url: '#', color: 'hover:bg-pink-600' },
  { icon: <FaLinkedinIn />, url: '#', color: 'hover:bg-blue-700' },
  { icon: <FaYoutube />, url: '#', color: 'hover:bg-red-600' },
]

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-secondary-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="py-8 sm:py-10 border-b border-gray-800">
          <div className="flex flex-col gap-5 sm:gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Stay Updated</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto sm:mx-0">
                Get health tips and updates delivered to your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full max-w-xl mx-auto sm:mx-0 sm:ml-auto gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full min-h-[48px] px-4 sm:px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl sm:rounded-l-button sm:rounded-r-none text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="button"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl sm:rounded-l-none sm:rounded-r-button hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
              >
                <FiSend className="text-sm" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="text-center sm:text-left">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shrink-0">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Smart</span>
                <span className="text-xl font-bold text-primary-400">_Doc</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto sm:mx-0">
              Your trusted healthcare management platform. We connect patients with top
              doctors and make healthcare accessible to everyone.
            </p>
            <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 text-sm transition-all duration-300 ${social.color} hover:text-white`}
                  aria-label="Social media link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-4 sm:mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-300 inline-block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-4 sm:mb-5 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-secondary-400 transition-colors duration-300 inline-block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-4 sm:mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-4 max-w-xs mx-auto sm:mx-0">
              <div className="flex items-start gap-3 justify-center sm:justify-start text-left">
                <FiMapPin className="text-primary-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400">
                  123 Healthcare Avenue,
                  <br />
                  Medical District, NY 10001
                </p>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <FiPhone className="text-primary-400 shrink-0" />
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start min-w-0">
                <FiMail className="text-primary-400 shrink-0" />
                <a
                  href="mailto:hello@smartdoc.com"
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors break-all"
                >
                  hello@smartdoc.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 sm:py-6 border-t border-gray-800 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Smart_Doc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors py-1">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors py-1">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="pb-6 sm:pb-8 pt-2 border-t border-gray-800/80">
          <p className="text-center text-sm sm:text-base text-gray-400 font-medium tracking-wide px-4">
            Designed and Created by{' '}
            <span className="text-primary-400 font-semibold">VISHAL JANGID</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
