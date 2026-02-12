import { supabase } from '@/integrations/supabase/client';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}

export const authService = {
  async register(data: RegisterData) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return { user: authData.user, session: authData.session };
  },

  async login(data: LoginData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    return { user: authData.user, session: authData.session };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async forgotPassword(data: ForgotPasswordData) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async resetPassword(data: ResetPasswordData) {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) throw error;
  },

  isAuthenticated(): boolean {
    // This is a sync check; for reliable check use getSession()
    return false; // Will be replaced by onAuthStateChange listener
  },
};
