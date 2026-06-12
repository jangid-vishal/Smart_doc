import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointments } from '../../../store/slices/adminSlice';
import { FiSearch, FiClock } from 'react-icons/fi';

const ManageAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, isLoading } = useSelector((state) => state.admin);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  const term = searchTerm.toLowerCase();
  const filteredAppointments = appointments.filter((apt) =>
    apt.patientId?.name?.toLowerCase().includes(term) ||
    apt.doctorId?.userId?.name?.toLowerCase().includes(term)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Appointments</h2>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 max-w-md">
        <FiSearch className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by patient or doctor..." 
          className="w-full bg-transparent outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="mobile-table-wrap sm:overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[560px] sm:min-w-0">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="py-4 px-6 font-medium">Date & Time</th>
                <th className="py-4 px-6 font-medium">Patient</th>
                <th className="py-4 px-6 font-medium">Doctor</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center">Loading appointments...</td>
                </tr>
              ) : filteredAppointments.map((apt) => (
                <tr key={apt._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-gray-900 font-medium">
                    <div className="flex flex-col">
                      <span>{new Date(apt.date).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <FiClock /> {apt.timeSlot}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900">{apt.patientId?.name || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{apt.patientId?.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900">Dr. {apt.doctorId?.userId?.name || 'N/A'}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${
                      apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      apt.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
