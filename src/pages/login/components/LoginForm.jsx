import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { signInWithEmail, loading, error, clearError } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear global error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const { user } = await signInWithEmail(formData?.email, formData?.password);
      
      if (user) {
        // Get redirect path from localStorage or default based on role
        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/product-catalog';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      }
    } catch (error) {
      // Error is already handled by AuthContext
      console.error('Login failed:', error);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData?.email) {
      setErrors({ email: 'Please enter your email address first' });
      return;
    }

    // Navigate to forgot password page with email pre-filled
    navigate('/forgot-password', { state: { email: formData?.email } });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-soft border border-border p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your EcommerceHub account</p>
        </div>

        {/* Global Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 text-sm font-medium">Authentication Failed</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              {error?.includes('Cannot connect') && (
                <button
                  onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                  className="text-red-600 text-sm underline mt-2 hover:text-red-800"
                >
                  Open Supabase Dashboard
                </button>
              )}
            </div>
          </div>
        )}

        {/* Demo Credentials Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-700 text-sm font-medium">Demo Credentials</p>
              <div className="text-blue-600 text-xs mt-2 space-y-1">
                <p><strong>Customer:</strong> customer@ecommercehub.com / customer123</p>
                <p><strong>Admin:</strong> admin@ecommercehub.com / admin123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={loading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              disabled={loading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Additional Actions */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleForgotPassword}
            className="w-full text-center text-sm text-primary hover:text-primary/80 transition-smooth"
            disabled={loading}
          >
            Forgot your password?
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Don't have an account?</span>
            </div>
          </div>

          <Link to="/register">
            <Button variant="outline" className="w-full" disabled={loading}>
              Create New Account
            </Button>
          </Link>
        </div>

        {/* Help Link */}
        <div className="mt-8 text-center">
          <Link 
            to="/support"
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth inline-flex items-center space-x-1"
          >
            <Icon name="HelpCircle" size={16} />
            <span>Need Help?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;