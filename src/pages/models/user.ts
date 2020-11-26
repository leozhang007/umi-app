import { useState, useCallback } from 'react';

// hooks 管理方式 https://umijs.org/zh-CN/plugins/plugin-model
export default function useAuthModel() {
  const [user, setUser] = useState(null);
  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, []);
  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, []);
  return {
    user,
    signin,
    signout,
  };
}
