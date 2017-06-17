import axios from 'axios';

export const update = (token, user) => {
  return axios.put(`${process.env.REACT_APP_PUBLIC_URL}/api/user/${user._id}`, user, {
    headers: { Authorization: `bearer ${token}` }
  });
}

export const addUserStox = (token, stox) => {
  return axios.post(`${process.env.REACT_APP_PUBLIC_URL}/api/user/stox`, stox, {
    headers: { Authorization: `bearer ${token}` }
  });
}

export const removeUserStox = (token, stox) => {
  return axios.delete(`${process.env.REACT_APP_PUBLIC_URL}/api/user/stox/${stox}`, {
    headers: { Authorization: `bearer ${token}` }
  });
}

export const updateUserStox = (token, stox) => {
  return axios.put(`${process.env.REACT_APP_PUBLIC_URL}/api/user/stox/${stox._id}`, stox, {
    headers: { Authorization: `bearer ${token}` }
  });
}
