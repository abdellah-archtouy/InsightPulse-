// src/services/todoService.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export const signupService = {
  createsignup: async (todoData) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, todoData)
    return response.data
  }
  
}
