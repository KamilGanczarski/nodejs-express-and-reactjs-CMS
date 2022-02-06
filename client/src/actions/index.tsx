import axios from 'axios';

// Backend settings
import { baseUrl, baseAppUrl } from '../components/data';

export const logoutUserRequest = async () => {
  // If token in local storage is set
  if (!localStorage.token) return;

  // Remove token from local storage
  localStorage.removeItem('token');

  await axios.get(`${baseUrl}/api/v1/auth/logout`, {
      headers: {
        'Authorization': `${localStorage.token}`
      }
    })
    .then(res => {
      window.location.replace(`${baseAppUrl}/login`);
    })
    .catch(error => {
      console.log(error);
    });
}
