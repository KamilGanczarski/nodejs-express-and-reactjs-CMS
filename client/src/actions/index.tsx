import axios from 'axios';

// Utils
import { baseApiUrl, baseAppUrl, axiosHeaders } from '../utils/tokenAPI';

export const logoutUserRequest = async () => {
  // If token in local storage is set
  if (!localStorage.token) return;

  // Remove token from local storage
  localStorage.removeItem('token');

  await axios.get(`${baseApiUrl}/api/v1/auth/logout`, axiosHeaders)
    .then(res => {
      window.location.replace(`${baseAppUrl}/login`);
    })
    .catch(error => {
      console.log(error);
    });
}
