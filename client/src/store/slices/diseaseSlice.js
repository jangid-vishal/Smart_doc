import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/diseases'

const initialState = {
  diseases: [],
  disease: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getDiseases = createAsyncThunk(
  'diseases/getAll',
  async (keyword = '', thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}?keyword=${keyword}`)
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

export const diseaseSlice = createSlice({
  name: 'disease',
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
      .addCase(getDiseases.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDiseases.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.diseases = action.payload
      })
      .addCase(getDiseases.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = diseaseSlice.actions
export default diseaseSlice.reducer
