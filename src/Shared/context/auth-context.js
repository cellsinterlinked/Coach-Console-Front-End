import { createContext } from 'react';
//this is an object we can share between 
//components and when we update it any component that listens to it will also update
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null, 
  login: () => {}, 
  logout: () => {} });