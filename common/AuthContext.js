import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useReducer } from 'react';
import utils from './utils';

const AuthContext = createContext();
const initialState = {
  empty:false,
  empty2:false,
  logined: false,
  display:'all',
  notiSuc:false,
  notiInfo:false,
  notiFail:false,
  notiMessage:"",
  showProtocolDialog:false,
};
const HideAllNoti=(state)=>{
  return { ...state, notiSuc: false, notiFail: false, }
}
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGOUT':
      AsyncStorage.setItem("token","")
      AsyncStorage.clear()
      utils.token=""
      return { ...state, logined: false };
    case 'LOGIN':
      utils.get401=false
      return { ...state, logined: true };
    case 'HIDE':
      return { ...state,empty:true ,empty2:false, display: 'none'};
    case 'SHOW':
      return { ...state,empty:false,empty2:true, display: 'all' };
    case 'SUCCESS':
      state=HideAllNoti(state)
      return { ...state, notiSuc: true, notiMessage: action.message};
    case 'FAIL':
      state=HideAllNoti(state)
      console.log("FAIL")
      return { ...state, notiFail: true, notiMessage: action.message };
    case 'INFO':
      state=HideAllNoti(state)
      return { ...state, notiInfo: true, notiMessage: action.message };
    case 'NOTIHIDE':
      return HideAllNoti(state)
    case 'SHOWDIALOG':
      console.log("showdia")
      return { ...state, showProtocolDialog:true };
    case 'HIDEDIALOG':
      return { ...state, showProtocolDialog:false };
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
