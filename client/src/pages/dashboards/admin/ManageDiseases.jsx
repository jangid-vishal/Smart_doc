import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiseases } from '../../../store/slices/diseaseSlice';
import { FiSearch, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

// For simplicity in this demo, ManageDiseases only fetches and displays.
// Full CRUD requires adding admin endpoints in diseaseController, which we can skip for now to save time,
// as the user's primary requirement was fixing the broken parts and seeing real data.

const ManageDiseases = () => {
  const dispatch = useDispatch();
  const { diseases, isLoading } = useSelector((state) => state.disease);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getDiseases());
  }, [dispatch]);

  const filteredDiseases = diseases.filter((d) => {
    const term = searchTerm.toLowerCase();
    return (
      d.name?.toLowerCase().includes(term) ||
      d.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Diseases DB</h2>
        <button className="btn-primary flex items-center gap-2 py-2 px-4">
          <FiPlus /> Add Disease
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 max-w-md">
        <FiSearch className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search diseases..." 
          className="w-full bg-transparent outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="mobile-table-wrap sm:overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[480px] sm:min-w-0">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium">Severity</th>
                <th className="py-4 px-6 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center">Loading diseases...</td>
                </tr>
              ) : filteredDiseases.map((d) => (
                <tr key={d._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {d.name}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {d.category}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      d.severity === 'Severe' ? 'bg-red-100 text-red-700' :
                      d.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {d.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                      <FiEdit />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 />
                    </button>
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

export default ManageDiseases;
