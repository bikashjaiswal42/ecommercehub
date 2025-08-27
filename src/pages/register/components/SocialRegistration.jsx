import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({
    google: false,
    facebook: false,
    apple: false
  });

  const handleSocialSignup = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));

    try {
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful social registration
      const userData = {
        id: Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe@${provider}.com`,
        provider: provider,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
        createdAt: new Date()?.toISOString()
      };

      // Store user data and auth token
      localStorage.setItem('authToken', `${provider}-token-` + Date.now());
      localStorage.setItem('userData', JSON.stringify(userData));

      // Show success message and redirect
      alert(`Successfully signed up with ${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)}!`);
      navigate('/product-catalog');

    } catch (error) {
      alert(`Failed to sign up with ${provider}. Please try again.`);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Google Sign Up */}
          <Button
            variant="outline"
            onClick={() => handleSocialSignup('google')}
            loading={isLoading?.google}
            disabled={Object.values(isLoading)?.some(loading => loading)}
            className="w-full"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </div>
          </Button>

          {/* Facebook Sign Up */}
          <Button
            variant="outline"
            onClick={() => handleSocialSignup('facebook')}
            loading={isLoading?.facebook}
            disabled={Object.values(isLoading)?.some(loading => loading)}
            className="w-full"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </div>
          </Button>

          {/* Apple Sign Up */}
          <Button
            variant="outline"
            onClick={() => handleSocialSignup('apple')}
            loading={isLoading?.apple}
            disabled={Object.values(isLoading)?.some(loading => loading)}
            className="w-full"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 8.025.044 8.025.044c-3.368.367-4.497 3.707-4.497 3.707-.429 1.428-.508 2.498-.508 4.286 0 1.714.71 3.227 1.818 4.31-.45.45-.818 1.07-.818 1.818 0 1.429 1.16 2.588 2.588 2.588.748 0 1.368-.368 1.818-.818 1.083 1.108 2.596 1.818 4.31 1.818 1.788 0 2.858-.079 4.286-.508 0 0 3.34-1.129 3.707-4.497 0 0 .044-.371.044-3.992C24 8.396 23.956 8.025 23.956 8.025c-.367-3.368-3.707-4.497-3.707-4.497C18.821.099 17.751.02 15.963.02c-1.714 0-3.227.71-4.31 1.818C11.203.388 10.583.02 9.835.02 8.406.02 7.247 1.179 7.247 2.608c0 .748.368 1.368.818 1.818C6.957 5.509 6.247 7.022 6.247 8.736c0 1.788.079 2.858.508 4.286 0 0 1.129 3.34 4.497 3.707 0 0 .371.044 3.992.044 3.621 0 3.992-.044 3.992-.044 3.368-.367 4.497-3.707 4.497-3.707.429-1.428.508-2.498.508-4.286 0-1.714-.71-3.227-1.818-4.31.45-.45.818-1.07.818-1.818 0-1.429-1.16-2.588-2.588-2.588-.748 0-1.368.368-1.818.818-1.083-1.108-2.596-1.818-4.31-1.818z" />
              </svg>
              <span>Continue with Apple</span>
            </div>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;