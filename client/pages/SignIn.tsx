import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LayoutDashboard, Mail, Lock, Loader2 } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCreateSignin } from "@/hooks";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast"; // If you have toast notifications

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const createsignin = useCreateSignin();
  const googleAuth = useGoogleAuth();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast(); // Optional

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createsignin.mutate(formData, {
      onSuccess: (data) => {
        console.log("Sign in successful:", data);
        navigate("/"); 
      },
      onError: (error: any) => {
        console.error("Sign in failed:", error);
        toast?.({
          title: "Sign in failed",
          description: error.message || "Please check your credentials",
          variant: "destructive"
        });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const result = await googleAuth.mutateAsync({
        idToken: credentialResponse.credential
      });

      // Login the user with the returned data
      login(result.user);
      
      toast?.({
        title: "Welcome back!",
        description: `Signed in as ${result.user.name || result.user.email}`,
      });

      navigate("/");
    } catch (error: any) {
      console.error('Google signin error:', error);
      toast?.({
        title: "Google Sign In Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign In Failed');
    toast?.({
      title: "Google Sign In Failed",
      description: "Unable to sign in with Google. Please try again.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 animate-gradient">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              DataHub
            </span>
          </div>
        </div>

        <Card className="shadow-lg animate-scale-in card-container">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In Button */}
            <div className="w-full">
              {googleAuth.isPending ? (
                <Button
                  variant="outline"
                  className="w-full h-11"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in with Google...
                </Button>
              ) : (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              )}
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                className="w-full btn-hover"
                disabled={createsignin.isPending}
              >
                {createsignin.isPending ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
