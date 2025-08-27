import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const fetchUserProfile = (userId) => {
    if (!userId) return;
    
    supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()?.then(({ data, error }) => {
        if (error && error?.code !== 'PGRST116') {
          console.error('Error fetching user profile:', error);
          setError('Failed to load user profile');
        } else if (data) {
          setUserProfile(data);
        }
      });
  };

  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session?.user);
          fetchUserProfile(session?.user?.id);
        }
        setLoading(false);
      })?.catch((error) => {
        console.error('Error getting initial session:', error);
        setError('Failed to initialize authentication');
        setLoading(false);
      });

    // Listen for auth changes - NEVER ASYNC callback
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session?.user);
          fetchUserProfile(session?.user?.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
        clearError();
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Auth methods that handle errors consistently
  const signUp = async (email, password, userData) => {
    try {
      clearError();
      setLoading(true);
      const result = await authService?.signUp(email, password, userData);
      return result;
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Please check your Supabase configuration and try again.');
      } else {
        setError(error?.message || 'Failed to create account');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      clearError();
      setLoading(true);
      const data = await authService?.signInWithEmail(email, password);
      return data;
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
      } else {
        setError(error?.message || 'Failed to sign in');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      clearError();
      setLoading(true);
      const data = await authService?.signInWithGoogle();
      return data;
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
      } else {
        setError(error?.message || 'Failed to sign in with Google');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      clearError();
      setLoading(true);
      await authService?.signOut();
    } catch (error) {
      setError(error?.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      clearError();
      const data = await authService?.resetPassword(email);
      return data;
    } catch (error) {
      setError(error?.message || 'Failed to send reset email');
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      clearError();
      const updatedProfile = await authService?.updateProfile(updates);
      setUserProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      setError(error?.message || 'Failed to update profile');
      throw error;
    }
  };

  const resendEmailVerification = async () => {
    try {
      clearError();
      const data = await authService?.resendEmailVerification();
      return data;
    } catch (error) {
      setError(error?.message || 'Failed to resend verification email');
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    clearError,
    signUp,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    resendEmailVerification,
    // Computed values
    isAuthenticated: !!user,
    isEmailVerified: user?.email_confirmed_at != null || userProfile?.email_verified === true,
    userRole: userProfile?.role || 'customer',
    isAdmin: userProfile?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};