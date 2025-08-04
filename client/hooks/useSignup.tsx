// src/hooks/useTodos.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signupService } from '../services/signupService'

// ✅ THIS IS WHERE useCreateTodo COMES FROM!
export const useCreateSignup = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: signupService.createsignup,
    onSuccess: (newTodo) => {
        console.log('Signup successfully:', newTodo)
    },
    onError: (error) => {
      console.error('Failed to Signup:', error)
    }
  })
}
