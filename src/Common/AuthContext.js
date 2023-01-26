import { createContext } from "react";
// This separate file is saving me from HMR hot reload bug...phew...thanks to https://github.com/vitejs/vite/issues/3301#issuecomment-1080030773
export const AuthContext = createContext(null); //createContext({userInfo: null, setAuth: (auth) => {}}); 
