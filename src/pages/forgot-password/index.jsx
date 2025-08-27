import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location?.state?.email || '');
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  
  const { resetPassword, loading, error, clearError } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      console.error('Reset password failed:', error);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e?.target?.value);
    
    // Clear errors when user starts typing
    if (errors?.email) {
      setErrors({});
    }
    
    // Clear global error
    if (error) {
      clearError();
    }
  };

  if (emailSent) {
    return (
      <>
        <Helmet>
          <title>Reset Email Sent - EcommerceHub</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          
          <div className="pt-20 pb-4 bg-muted/30">
            <div className="container mx-auto px-4">
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Home
                </Link>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Sign In
                </Link>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                <span className="text-foreground font-medium">Reset Password</span>
              </nav>
            </div>
          </div>

          <main className="flex-1 py-8 sm:py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <div className="bg-card rounded-lg shadow-soft border border-border p-6 sm:p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Mail" size={32} className="text-green-600" />
                    </div>
                    <h1 className="text-2xl font-semibold text-foreground mb-2">Check Your Email</h1>
                    <p className="text-muted-foreground mb-6">
                      We've sent a password reset link to <strong>{email}</strong>. 
                      Click the link in the email to reset your password.
                    </p>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Didn't receive the email? Check your spam folder or try again.
                      </p>
                      
                      <Button
                        variant="outline"
                        onClick={() => setEmailSent(false)}
                        className="w-full"
                      >
                        Try Different Email
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
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password - EcommerceHub</title>
        <meta name="description" content="Reset your EcommerceHub password. Enter your email address and we'll send you a link to reset your password." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Breadcrumb */}
        <div className="pt-20 pb-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-smooth">
                Sign In
              </Link>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">Forgot Password</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-card rounded-lg shadow-soft border border-border p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Lock" size={32} color="white" />
                  </div>
                  <h1 className="text-2xl font-semibold text-foreground mb-2">Forgot Password?</h1>
                  <p className="text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <Icon name="AlertCircle" size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 text-sm font-medium">Error</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleInputChange}
                    error={errors?.email}
                    required
                    disabled={loading}
                    autoFocus
                  />

                  <Button
                    type="submit"
                    variant="default"
                    loading={loading}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-6">
                  <Link to="/login">
                    <Button variant="outline" className="w-full" disabled={loading}>
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ForgotPassword;