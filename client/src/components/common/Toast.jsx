import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const Toast = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500 text-xl" />;
      case 'error':
        return <FiXCircle className="text-red-500 text-xl" />;
      case 'warning':
        return <FiAlertTriangle className="text-orange-500 text-xl" />;
      default:
        return <FiInfo className="text-blue-500 text-xl" />;
    }
  };

  const getBgClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'warning':
        return 'bg-orange-50 border-orange-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${getBgClass()} min-w-[300px]`}
      >
        {getIcon()}
        <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <FiX />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
