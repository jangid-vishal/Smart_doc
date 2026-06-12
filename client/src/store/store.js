import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import doctorReducer from './slices/doctorSlice'
import appointmentReducer from './slices/appointmentSlice'
import diseaseReducer from './slices/diseaseSlice'
import prescriptionReducer from './slices/prescriptionSlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
    disease: diseaseReducer,
    prescription: prescriptionReducer,
    admin: adminReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
})
