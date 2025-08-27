import { supabase } from '../lib/supabase';

class AuthService {
  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      throw error;
    }
  }

  // Get current user with profile
  async getCurrentUser() {
    try {
      const { data: { user }, error: userError } = await supabase?.auth?.getUser();
      if (userError) throw userError;
      if (!user) return null;

      // Get user profile
      const { data: profile, error: profileError } = await supabase?.from('user_profiles')?.select('*')?.eq('id', user?.id)?.single();

      if (profileError && profileError?.code !== 'PGRST116') {
        throw profileError;
      }

      return { user, profile };
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Email/Password Sign Up with email verification
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            role: userData?.role || 'customer'
          }
        }
      });

      if (error) throw error;

      return {
        user: data?.user,
        session: data?.session,
        needsEmailVerification: !data?.session
      };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Email/Password Sign In
  async signInWithEmail(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  }

  // Google OAuth Sign In
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location?.origin}/product-catalog`
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Sign Out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Reset Password
  async resetPassword(email) {
    try {
      const { data, error } = await supabase?.auth?.resetPasswordForEmail(email, {
        redirectTo: `${window.location?.origin}/reset-password`
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Update Password
  async updatePassword(newPassword) {
    try {
      const { data, error } = await supabase?.auth?.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  // Update Profile
  async updateProfile(updates) {
    try {
      const { data: { user }, error: userError } = await supabase?.auth?.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase?.from('user_profiles')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', user?.id)?.select()?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Resend Email Verification
  async resendEmailVerification() {
    try {
      const { data: { user }, error: userError } = await supabase?.auth?.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase?.auth?.resend({
        type: 'signup',
        email: user?.email
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();