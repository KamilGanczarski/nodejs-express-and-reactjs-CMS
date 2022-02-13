import axios from 'axios';

export const baseUrl = 'http://localhost:3001';
export const baseAppUrl = 'http://localhost:3000';
export const axiosHeaders = {
  headers: {
    'Authorization': `${localStorage.token}`
  }
}

export const redirectAfterLogin = (permission: string) => {
  switch (permission) {
    case 'admin':
      window.location.replace(`${baseAppUrl}/admin/home`);
      break;

    default:
      window.location.replace(`${baseAppUrl}/404`);
      break;
  }
}

export interface TokenModel {
  user: {
    userId: string;
    login: string;
    permission: number;
    role: string;
  }
}

export interface RoleModel {
  _id: string;
  value: string;
}

export const checkValidToken = async () => {
  // If token in local storage is set
  if (!localStorage.token) {
    throw new Error('No token has been set');
  }

  return await axios.get(`${baseUrl}/api/v1/auth/check-token`, axiosHeaders)
    .then(res => res)
    .catch(error => {
      throw new Error(error);
    });
}

export const redirectIValidToken = async () => {
  try {
    const res: any = await checkValidToken();
    redirectAfterLogin(res.data.user.role);
  } catch (error: any) {
    console.log(error.message)
  }
}

// export const checkHttpStatus = async () => {
//   const res = await checkValidToken();
//   if (res.status < 200 || res.status <= 300) {
//     console.log(res);
//   }
//   return res;
// }
