import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import axios from 'axios';

// Utils
import { TokenModel } from '../../interfaces/interfaces';
import {
  baseApiUrl,
  axiosHeaders,
  decodeToken,
  redirectTo
} from '../../utils/tokenAPI';

type Props = {};

export default function AdminRoute({}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const checkValidToken = async () => {
    // If token in local storage is set
    if (!localStorage.token) {
      redirectTo('/login');
    }

    await axios.get(`${baseApiUrl}/api/v1/auth/check-token`, axiosHeaders)
      .then(res => {
        const decodedToken: TokenModel = decodeToken(res.data.token);
        // Redirect to change-password if password expired
        if (decodedToken.user.changePassword) {
          redirectTo('/change-password');
        // Redirect to login if user hasn't specyfic permissions
        } else if (!['admin'].includes(decodedToken.user.role)) {
          redirectTo('/login');
        }
      })
      .catch(error => {
        redirectTo('/login');
      });

    setIsLoading(false);
  }

  useEffect(() => {
    document.title = "Admin"
    checkValidToken();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Outlet />
  );
}
