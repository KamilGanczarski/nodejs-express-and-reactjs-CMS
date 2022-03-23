import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { TokenModel } from './interfaces';

export const baseUrl = 'http://localhost:3001';
export const baseAppUrl = 'http://localhost:3000';
export const axiosHeaders = {
  headers: {
    'Authorization': `${localStorage.token}`
  }
}

/**
 * Redirect depend on permission
 * @param permission 
 */
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

// Get and decode token
export const getTokenDecoded = (): TokenModel => {
  return decodeToken(localStorage.token);
}

/**
 * Decode token
 * @param token Token
 * @returns decoded token
 */
export const decodeToken = (token: string): TokenModel => {
  return jwt_decode(token);
}

// Check valid token
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

// Redirect if token is valid
export const redirectIfValidToken = async () => {
  try {
    const response: any = await checkValidToken();
    localStorage.setItem('token', response.data.token);
    const decodedToken: TokenModel = decodeToken(response.data.token);
    if (decodedToken.user.changePassword) {
      redirectTo('/change-password');
      return;
    }
    redirectAfterLogin(decodedToken.user.role);
  } catch (error: any) {
    console.log(error.message)
  }
}

// Redirect to with parameters (optionally)
export const redirectTo = (link: string, parameters: string = '') => {
  window.location.replace(
    `${baseAppUrl}${link}${parameters && '/' + parameters}`
  );
}

/**
 * Send post to server with login and password,
 *    if correct redirect to specyfic page,
 *    else return response
 * @param login Login
 * @param password Password
 * @returns Return response from server if unauthorized
 */
export const loginToServer = async (login: string, password: string) => {
  const response = await axios.post(`${baseUrl}/api/v1/auth/login`, {
      login: login,
      password: password
    })
    .then((response) => {
      if (response.data.token) {
        // Set token from local storage
        localStorage.setItem('token', response.data.token);
        const decodedToken: TokenModel = jwt_decode(response.data.token);
        if (decodedToken.user.changePassword) {
          redirectTo('/change-password', '');
        } else {
          redirectAfterLogin(decodedToken.user.role);
        }
        return '';
      }
      return '';
    })
    .catch(error => {
      if (error.response.data.msg) {
        return error.response.data.msg;
      }
      return 'Error with server';
    });

  return response;
}
