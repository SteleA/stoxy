import axios from 'axios';

export const login = (username, password) => {
  return axios.post(`${process.env.REACT_APP_PUBLIC_URL}/api/auth/local`, {username, password});
}
export const signup = (email, password) => {
  return axios.post(`${process.env.REACT_APP_PUBLIC_URL}/api/user`, {email, password});
}
