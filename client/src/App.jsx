import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import PatientDashboard from './pages/dashboards/PatientDashboard'
import DoctorDashboard from './pages/dashboards/DoctorDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import Doctors from './pages/Doctors'
import DoctorProfile from './pages/DoctorProfile'
import Diseases from './pages/Diseases'
import Blogs from './pages/Blogs'
import Prescriptions from './pages/dashboards/Prescriptions'
import ManageUsers from './pages/dashboards/admin/ManageUsers'
import ManageAppointments from './pages/dashboards/admin/ManageAppointments'
import ManageDiseases from './pages/dashboards/admin/ManageDiseases'
import Settings from './pages/dashboards/Settings'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/blogs" element={<Blogs />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard/appointments"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard/prescriptions"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Prescriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard/records"
          element={<Navigate to="/patient-dashboard/prescriptions" replace />}
        />
        <Route
          path="/patient-dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard/appointments"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard/prescriptions"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Prescriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard/patients"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard/schedule"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/doctors"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/patients"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/appointments"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/diseases"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageDiseases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
