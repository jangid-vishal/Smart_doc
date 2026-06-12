import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { createPrescription } from '../../store/slices/prescriptionSlice';
import { getAppointments } from '../../store/slices/appointmentSlice';
import { useToast } from '../../context/ToastContext';

const WritePrescriptionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  
  const { appointments } = useSelector((state) => state.appointment);
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.prescription);

  // Filter for completed or confirmed appointments to write prescriptions for
  const eligibleAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'confirmed');

  const [formData, setFormData] = useState({
    appointmentId: '',
    patientId: '',
    diagnosis: '',
    notes: '',
  });

  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      addToast('Prescription created successfully!', 'success');
      onClose();
    }
    if (isError) {
      addToast(message, 'error');
    }
  }, [isSuccess, isError, message, addToast, onClose]);

  const handleAppointmentChange = (e) => {
    const aptId = e.target.value;
    const selectedApt = appointments.find(a => a._id === aptId);
    setFormData({
      ...formData,
      appointmentId: aptId,
      patientId: selectedApt ? selectedApt.patientId._id : ''
    });
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const handleRemoveMedication = (index) => {
    const newMeds = [...medications];
    newMeds.splice(index, 1);
    setMedications(newMeds);
  };

  const handleMedicationChange = (index, field, value) => {
    const newMeds = [...medications];
    newMeds[index][field] = value;
    setMedications(newMeds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.appointmentId || !formData.diagnosis) {
      addToast('Please fill all required fields', 'warning');
      return;
    }
    
    const invalidMeds = medications.some(m => !m.name || !m.dosage || !m.frequency || !m.duration);
    if (invalidMeds) {
      addToast('Please complete all medication fields', 'warning');
      return;
    }

    dispatch(createPrescription({
      ...formData,
      medications
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto pt-20 pb-10">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-3xl shadow-2xl relative my-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-2"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Write New Prescription</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Patient/Appointment *</label>
              <select 
                required
                value={formData.appointmentId}
                onChange={handleAppointmentChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-700"
              >
                <option value="">-- Select Appointment --</option>
                {eligibleAppointments.map(apt => (
                  <option key={apt._id} value={apt._id}>
                    {apt.patientId?.name} ({new Date(apt.date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosis *</label>
              <input 
                type="text"
                required
                placeholder="e.g. Acute Bronchitis"
                value={formData.diagnosis}
                onChange={e => setFormData({...formData, diagnosis: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-700"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Medications</h3>
              <button 
                type="button" 
                onClick={handleAddMedication}
                className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg"
              >
                <FiPlus /> Add Drug
              </button>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto p-1 custom-scrollbar">
              {medications.map((med, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                  {medications.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => handleRemoveMedication(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-3 pr-8">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Drug Name *</label>
                      <input type="text" required value={med.name} onChange={e => handleMedicationChange(index, 'name', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" placeholder="e.g. Amoxicillin" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Dosage *</label>
                      <input type="text" required value={med.dosage} onChange={e => handleMedicationChange(index, 'dosage', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" placeholder="e.g. 500mg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Frequency *</label>
                      <input type="text" required value={med.frequency} onChange={e => handleMedicationChange(index, 'frequency', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" placeholder="e.g. Twice a day" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Duration *</label>
                      <input type="text" required value={med.duration} onChange={e => handleMedicationChange(index, 'duration', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" placeholder="e.g. 7 days" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Instructions (Optional)</label>
                    <input type="text" value={med.instructions} onChange={e => handleMedicationChange(index, 'instructions', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" placeholder="e.g. Take after meals" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
            <textarea 
              rows="2"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-700 resize-none"
              placeholder="Any diet restrictions, rest period, etc."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="btn-primary px-8 py-2.5 rounded-xl">
              {isLoading ? 'Saving...' : 'Save Prescription'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default WritePrescriptionModal;
