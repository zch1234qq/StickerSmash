import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
const initialState = {
  logined: false,
  display:'all'
};
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGOUT':
      // AsyncStorage.setItem("token","")
      AsyncStorage.clear()
      return { ...state, logined: false };
      case 'LOGIN':
        return { ...state, logined: true };
      case 'HIDE':
        return { ...state, display: 'none' };
        case 'SHOW':
        return { ...state, display: 'all' };
    default:
      return state;
  }
}
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
