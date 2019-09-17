import Cookies from 'js-cookie';

// App
const sidebarStatusKey = 'sidebar_status';
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus);

const sizeKey = 'size';
export const getSize = () => Cookies.get(sizeKey);
export const setSize = (size: string) => Cookies.set(sizeKey, size);

// User
const tokenKey = 'vue_gui_admin_access_token';
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);



export function getCurrentAuthority() {
  return ['admin'];
}

export function check(authority: string) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function islogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== 'guest';
}
