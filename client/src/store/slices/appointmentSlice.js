import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/appointments'

const initialState = {
  appointments: [],
  appointment: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Book appointment
export const bookAppointment = createAsyncThunk(
  'appointments/book',
  async (appointmentData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, appointmentData)
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user appointments
export const getAppointments = createAsyncThunk(
  'appointments/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/myappointments`)
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update appointment status (Doctor/Admin)
export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/status`, { status })
      return response.data
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.appointments.push(action.payload)
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.appointments = action.payload
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Update the specific appointment in the state array
        const index = state.appointments.findIndex(
          (apt) => apt._id === action.payload._id
        )
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = appointmentSlice.actions
export default appointmentSlice.reducer
