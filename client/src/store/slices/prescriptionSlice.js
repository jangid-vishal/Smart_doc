import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/prescriptions'

const initialState = {
  prescriptions: [],
  prescription: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new prescription (Doctor only)
export const createPrescription = createAsyncThunk(
  'prescriptions/create',
  async (prescriptionData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, prescriptionData)
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

// Get user's prescriptions (Patient)
export const getMyPrescriptions = createAsyncThunk(
  'prescriptions/getMy',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/my`)
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

// Get issued prescriptions (Doctor)
export const getIssuedPrescriptions = createAsyncThunk(
  'prescriptions/getIssued',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/issued`)
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

export const prescriptionSlice = createSlice({
  name: 'prescription',
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
      .addCase(createPrescription.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.prescriptions.unshift(action.payload)
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyPrescriptions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyPrescriptions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.prescriptions = action.payload
      })
      .addCase(getMyPrescriptions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getIssuedPrescriptions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getIssuedPrescriptions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.prescriptions = action.payload
      })
      .addCase(getIssuedPrescriptions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = prescriptionSlice.actions
export default prescriptionSlice.reducer
