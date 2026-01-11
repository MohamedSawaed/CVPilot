import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  onAuthStateChanged,
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  logOut
} from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const result = await signInWithEmail(email, password);
      if (result && result.error) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      const errorMessage = err?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const result = await signInWithGoogle();
      if (result && result.error) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      const errorMessage = err?.message || 'Google login failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  const register = async (email, password, displayName) => {
    setError(null);
    try {
      const result = await registerWithEmail(email, password, displayName);
      if (result && result.error) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      const errorMessage = err?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      const result = await logOut();
      if (result && result.error) {
        setError(result.error);
        return false;
      }
      return true;
    } catch (err) {
      const errorMessage = err?.message || 'Logout failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
