import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const navigate = useNavigate();
  const { signUp, loading, error, clearError } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
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
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
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
      const result = await signUp(formData?.email, formData?.password, {
        fullName: formData?.fullName,
        role: 'customer'
      });
      
      if (result?.needsEmailVerification) {
        setRegistrationComplete(true);
      } else if (result?.user) {
        // User is immediately signed in (email confirmation disabled)
        navigate('/product-catalog');
      }
    } catch (error) {
      // Error is already handled by AuthContext
      console.error('Registration failed:', error);
    }
  };

  if (registrationComplete) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-lg shadow-soft border border-border p-6 sm:p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Check Your Email</h1>
            <p className="text-muted-foreground mb-6">
              We've sent a verification link to <strong>{formData?.email}</strong>. 
              Please click the link in the email to verify your account.
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or
              </p>
              <Button
                variant="outline"
                onClick={() => window.location?.reload()}
                className="w-full"
              >
                Try Again
              </Button>
              
              <Link to="/login">
                <Button variant="default" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-soft border border-border p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="UserPlus" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join EcommerceHub today</p>
        </div>

        {/* Global Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 text-sm font-medium">Registration Failed</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
            disabled={loading}
          />

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
              placeholder="Create a password"
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

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              disabled={loading}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e?.target?.checked);
                  if (errors?.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }));
                  }
                }}
                className="mt-1 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                disabled={loading}
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors?.terms && (
              <p className="text-sm text-red-600">{errors?.terms}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            loading={loading}
            disabled={loading || !acceptTerms}
            className="w-full"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Additional Actions */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
            </div>
          </div>

          <Link to="/login" className="block mt-4">
            <Button variant="outline" className="w-full" disabled={loading}>
              Sign In Instead
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;