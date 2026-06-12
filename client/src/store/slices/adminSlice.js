import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/admin'

const initialState = {
  stats: null,
  users: [],
  appointments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getDashboardStats = createAsyncThunk('admin/getStats', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/stats`)
    return response.data
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAllUsers = createAsyncThunk('admin/getUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/users`)
    return response.data
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateUserRole = createAsyncThunk('admin/updateRole', async ({ id, role }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}/role`, { role })
    return response.data
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`)
    return id
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAllAppointments = createAsyncThunk('admin/getAppointments', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/appointments`)
    return response.data
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => { state.isLoading = true })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.stats = action.payload
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllUsers.pending, (state) => { state.isLoading = true })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u._id === action.payload._id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload)
      })
      .addCase(getAllAppointments.pending, (state) => { state.isLoading = true })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.appointments = action.payload
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetAdmin } = adminSlice.actions
export default adminSlice.reducer
