import React, { createContext, useState, useEffect } from 'react';
import API from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    setUser({ token: res.data.token, ...res.data.user });
    return res.data;
  };

  const register = async (payload) => {
    const res = await API.post('/auth/register', payload);
    setUser({ token: res.data.token, ...res.data.user });
    return res.data;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
