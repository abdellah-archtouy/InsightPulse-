// hooks/useGoogleAuth.ts (updated for same port)
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface GoogleAuthResponse {
  success: boolean;
  user: {
    id: number;
    name: string | null;
    email: string;
    avatar: string | null;
    username: string | null;
    firstName: string | null;
    lastname: string | null;
  };
}

interface GoogleAuthRequest {
  idToken: string;
}

const googleAuth = async (data: GoogleAuthRequest): Promise<GoogleAuthResponse> => {
  // Use relative URL since frontend and backend are on same port
  const response = await fetch('/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Google authentication failed');
  }

  return response.json();
};

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleAuth,
    onSuccess: (data) => {
      // Update auth state in cache
      queryClient.setQueryData(['auth', 'user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};
