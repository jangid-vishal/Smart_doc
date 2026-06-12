import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDoctors, reset } from '../store/slices/doctorSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiFilter, FiStar, FiClock, FiMapPin } from 'react-icons/fi'
import AppointmentBookingModal from '../components/doctors/AppointmentBookingModal'
import { formatDoctorName } from '../utils/formatDoctorName'

const Doctors = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [specialization, setSpecialization] = useState('')
  const { doctors, isLoading, isError, message } = useSelector(
    (state) => state.doctor
  )
  const { user } = useSelector((state) => state.auth)

  const handleBookClick = (doctor) => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'patient') {
      alert('Only patients can book appointments. Please log in with a patient account.')
      return
    }
    setSelectedDoctor(doctor)
  }

  useEffect(() => {
    dispatch(getDoctors({ search: searchTerm, specialization }))
    return () => {
      dispatch(reset())
    }
  }, [dispatch, searchTerm, specialization])

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
        <div className="text-center text-red-600 bg-red-50 p-6 rounded-xl border border-red-100 max-w-lg w-full">
          <h2 className="text-lg font-bold mb-2">Error Loading Doctors</h2>
          <p>{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-top-spacing bg-surface-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Find the Right <span className="gradient-text">Doctor</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Browse our directory of top-rated specialists and book your appointment instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 sm:mt-8 bg-white p-3 sm:p-4 rounded-2xl shadow-card flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3 border border-gray-100 w-full"
          >
            <div className="flex-1 min-w-0 relative w-full sm:min-w-[12rem]">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500/30 sm:focus:ring-0 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>
            <div className="hidden sm:block w-px bg-gray-200 self-stretch" aria-hidden />
            <div className="flex-1 min-w-0 relative w-full sm:min-w-[12rem]">
              <FiFilter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500/30 sm:focus:ring-0 text-gray-700 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="psychiatry">Psychiatry</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => dispatch(getDoctors({ search: searchTerm, specialization }))}
              className="btn-primary py-3 px-6 w-full sm:w-auto shrink-0 text-sm sm:text-base"
            >
              Search
            </button>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : doctors.length > 0 ? (
          <div className="responsive-card-grid">
            {doctors.map((doctor, index) => {
              const displayName = formatDoctorName(doctor.userId?.name)
              return (
                <motion.article
                  key={doctor._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card border border-gray-100 transition-all duration-300 group flex flex-col h-full w-full"
                >
                  <div className="h-24 sm:h-28 bg-gradient-to-r from-primary-500 to-secondary-500 relative shrink-0">
                    <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                  </div>

                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 flex-1 flex flex-col">
                    {/* Avatar & Rating Row */}
                    <div className="flex justify-between items-end -mt-10 sm:-mt-12 mb-4">
                      <Link
                        to={`/doctor/${doctor._id}`}
                        className="w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 shrink-0 bg-white rounded-2xl p-1 shadow-elevated block"
                      >
                        <span className="w-full h-full rounded-xl bg-primary-100 flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity">
                          {doctor.userId?.avatar ? (
                            <img
                              src={doctor.userId.avatar}
                              alt={displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xl sm:text-2xl font-bold text-primary-600">
                              {formatDoctorName(doctor.userId?.name, { withPrefix: false }).charAt(0) || 'D'}
                            </span>
                          )}
                        </span>
                      </Link>

                      <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-lg shrink-0 mb-1">
                        <FiStar className="text-orange-400 fill-orange-400 text-sm shrink-0" />
                        <span className="text-sm font-bold text-orange-700">{doctor.rating}</span>
                        <span className="text-xs text-orange-600/70">
                          ({doctor.numReviews})
                        </span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="mb-4">
                      <Link to={`/doctor/${doctor._id}`} className="inline-block max-w-full">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                          {displayName}
                        </h3>
                      </Link>
                      <p className="text-sm font-semibold text-primary-500 capitalize">
                        {doctor.specialization}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2 min-w-0">
                        <FiClock className="text-gray-400 shrink-0" />
                        <span className="truncate">{doctor.experience} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <FiMapPin className="text-gray-400 shrink-0" />
                        <span className="truncate">{doctor.hospital || 'Smart Care Hospital'}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm shrink-0">
                        <span className="text-gray-500 block">Consultation Fee</span>
                        <p className="text-lg font-bold text-gray-900">${doctor.fees}</p>
                      </div>
                      <div className="flex flex-col min-[400px]:flex-row gap-2 w-full sm:w-auto">
                        <Link
                          to={`/doctor/${doctor._id}`}
                          className="btn-outline flex-1 sm:flex-none text-center px-4 py-2.5 text-sm font-semibold border-gray-200 text-gray-700"
                        >
                          View Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleBookClick(doctor)}
                          className="btn-primary flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold shadow-glow"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-gray-100 mx-auto max-w-lg w-full">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <FiSearch className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
            <p className="text-gray-500 px-4">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedDoctor && (
          <AppointmentBookingModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Doctors
