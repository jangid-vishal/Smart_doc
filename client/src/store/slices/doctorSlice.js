import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/doctors'

const initialState = {
  doctors: [],
  doctor: null,
  doctorDetails: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all doctors
export const getDoctors = createAsyncThunk(
  'doctors/getAll',
  async (queryParams = {}, thunkAPI) => {
    try {
      const { search, specialization } = queryParams;
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (specialization) params.set('specialization', specialization);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const response = await axios.get(`${API_URL}${queryStr}`)
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

// Get single doctor
export const getDoctor = createAsyncThunk(
  'doctors/getSingle',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
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

// Get doctor by ID
export const getDoctorById = createAsyncThunk(
  'doctors/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
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

export const doctorSlice = createSlice({
  name: 'doctor',
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
      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.doctors = action.payload
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDoctor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.doctor = action.payload
      })
      .addCase(getDoctor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDoctorById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.doctorDetails = action.payload
      })
      .addCase(getDoctorById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = doctorSlice.actions
export default doctorSlice.reducer
