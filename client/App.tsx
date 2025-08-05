// App.tsx (updated)
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Crypto from "./pages/Crypto";
import Weather from "./pages/Weather";
import GitHub from "./pages/GitHub";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// Get Google Client ID from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Debug logging (remove in production)
console.log('🔍 Environment check:');
console.log('VITE_GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);
console.log('Current URL:', window.location.origin);

if (!GOOGLE_CLIENT_ID) {
  console.error('❌ VITE_GOOGLE_CLIENT_ID not found in environment variables');
  console.log('📝 Please add VITE_GOOGLE_CLIENT_ID to your .env file');
} else {
  console.log('✅ Google Client ID loaded successfully');
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    {GOOGLE_CLIENT_ID ? (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout><Dashboard /></Layout>} />
                <Route path="/crypto" element={<Layout><Crypto /></Layout>} />
                <Route path="/weather" element={<Layout><Weather /></Layout>} />
                <Route path="/github" element={<Layout><GitHub /></Layout>} />
                <Route path="/settings" element={<Layout><Settings /></Layout>} />

                {/* Authentication Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Configuration Error</h1>
          <p className="text-gray-600 mb-4">Google Client ID is missing from environment variables.</p>
          <div className="bg-gray-100 p-4 rounded-lg text-left text-sm">
            <p className="font-semibold mb-2">To fix this:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Add this line to your .env file:</li>
              <code className="block bg-white p-2 rounded mt-1 mb-2">
                VITE_GOOGLE_CLIENT_ID="944569205977-l59i8dh64jg12gns4ltmiigd4k9mqk7f.apps.googleusercontent.com"
              </code>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    )}
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
