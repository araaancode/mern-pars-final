import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_SERVER_URL

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/api/users/auth/login`,
        { phone, password },
        config
      )

      // store user's token in local storage
      // localStorage.setItem('userToken', data.userToken)

      console.log(data);

      return data
      
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendURL}/api/users/auth/register`,
        { phone, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const sendOTP = createAsyncThunk(
  'auth/send-otp',
  async ({ phone }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `http://localhost:5000/api/users/auth/send-otp`,
        { phone },
        config
      )


    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'auth/verify-otp',
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }


      const { data } = await axios.post(
        `http://localhost:5000/api/users/auth/verify-otp`,
        { phone, code },
        config
      )
      
      localStorage.setItem('userToken', data.token)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)