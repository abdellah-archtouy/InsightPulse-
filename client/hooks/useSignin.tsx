// src/hooks/useTodos.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signinService } from '../services/signinService'

// ✅ THIS IS WHERE useCreateTodo COMES FROM!
export const useCreateSignin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: signinService.createsignin,
    onSuccess: (newTodo) => {
        console.log('Signup successfully:', newTodo)
    },
    onError: (error) => {
      console.error('Failed to Signup:', error)
    }
  })
}
