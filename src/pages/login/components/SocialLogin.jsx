import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const SocialLogin = () => {
  const { signInWithGoogle, loading, error } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth flow
    } catch (error) {
      // Error is already handled by AuthContext
      console.error('Google sign in failed:', error);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      {/* Google Sign In Button */}
      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={loading}
        loading={loading}
        className="w-full flex items-center justify-center space-x-3 py-3 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition-smooth"
      >
        {!loading && (
          <Icon name="Chrome" size={18} className="text-red-500" />
        )}
        <span className="font-medium">Continue with Google</span>
      </Button>
      {/* Error Display */}
      {error && error?.includes('Google') && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}
      {/* Info Section */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
      {/* Quick Access Info */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">
          Quick access with your Google account
        </p>
        
        {/* Benefits */}
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-green-500" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={12} className="text-yellow-500" />
            <span>Fast</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="User" size={12} className="text-blue-500" />
            <span>No signup</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;