import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiseases, reset } from '../store/slices/diseaseSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiInfo, FiAlertCircle, FiX, FiActivity, FiShield, FiHeart } from 'react-icons/fi'

const Diseases = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [selectedDisease, setSelectedDisease] = useState(null)

  const { diseases, isLoading, isError, message } = useSelector(
    (state) => state.disease
  )

  useEffect(() => {
    dispatch(getDiseases())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getDiseases(keyword))
  }

  return (
    <div className="page-top-spacing bg-surface-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Medical <span className="gradient-text">Encyclopedia</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Reliable, easy-to-understand information about hundreds of medical conditions and diseases.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 sm:mt-8 bg-white p-3 sm:p-2 rounded-2xl shadow-card flex flex-col sm:flex-row gap-2 sm:gap-2 border border-gray-100 w-full"
          >
            <div className="flex-1 relative min-w-0">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search diseases..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-gray-50 sm:bg-transparent rounded-xl sm:rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500/30 sm:focus:ring-0 text-gray-700 placeholder-gray-400 text-sm sm:text-base min-h-[48px]"
              />
            </div>
            <button type="submit" className="btn-primary py-3 px-6 w-full sm:w-auto min-h-[48px] shrink-0">
              Search
            </button>
          </motion.form>
        </div>

        {/* Diseases Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : isError ? (
           <div className="text-center text-red-600 bg-red-50 p-6 rounded-xl border border-red-100 max-w-2xl mx-auto">
             <h2 className="text-lg font-bold mb-2">Error Loading Diseases</h2>
             <p>{message}</p>
           </div>
        ) : diseases.length > 0 ? (
          <div className="responsive-card-grid">
            {diseases.map((disease, index) => (
              <motion.div
                key={disease._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-card border border-gray-100 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedDisease(disease)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <FiActivity size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    disease.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                    disease.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {disease.severity}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {disease.name}
                </h3>
                <p className="text-sm font-semibold text-primary-500 mb-3">{disease.category}</p>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {disease.overview}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-sm font-semibold text-primary-600">
                  Read more <FiSearch className="ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <FiInfo className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-500">We couldn't find any conditions matching your search.</p>
          </div>
        )}
      </div>

      {/* Disease Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 24 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-5 sm:p-8 text-white relative shrink-0">
                <button 
                  type="button"
                  onClick={() => setSelectedDisease(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2"
                  aria-label="Close"
                >
                  <FiX size={22} />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {selectedDisease.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                    Severity: {selectedDisease.severity}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-bold mb-2 pr-10">{selectedDisease.name}</h2>
              </div>

              <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 sm:space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FiInfo className="text-primary-500" /> Overview
                  </h4>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {selectedDisease.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FiAlertCircle className="text-orange-500" /> Symptoms
                    </h4>
                    <ul className="space-y-2">
                      {selectedDisease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FiActivity className="text-red-500" /> Causes
                    </h4>
                    <ul className="space-y-2">
                      {selectedDisease.causes.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FiShield className="text-green-500" /> Prevention
                    </h4>
                    <ul className="space-y-2">
                      {selectedDisease.prevention.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FiHeart className="text-primary-500" /> Treatments
                    </h4>
                    <ul className="space-y-2">
                      {selectedDisease.treatments.map((treatment, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></span>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Diseases
