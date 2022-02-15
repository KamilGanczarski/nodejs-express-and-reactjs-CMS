import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Backend settings
import {
  baseUrl,
  axiosHeaders,
  decodeToken,
  TokenModel
} from '../../components/data';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import EditUserForm from '../../components/Admin/EditUserForm/EditUserForm'
import ManagePermissions from '../../components/Admin/ManagePermissions/ManagePermissions'

interface EditUserParams {
  propsUserId: string;
}

type Props = {};

export default function EditUser({}: Props) {
  const { propsUserId } = useParams<EditUserParams>();
  const [ userId, setUserId ] = useState('');
  const [ editLoggedUser, setEditLoggedUser ] = useState(false);

  const fetchLoggedUser = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    await axios.get(`${baseUrl}/api/v1/auth/check-token`, axiosHeaders)
      .then(res => {
        const decodedToken: TokenModel = decodeToken(res.data.token);
        if (decodedToken.user.userId && !propsUserId) {
          setEditLoggedUser(true);
          setUserId(decodedToken.user.userId);
        } else if (propsUserId && propsUserId === res.data.user.userId) {
          setEditLoggedUser(true);
          setUserId(decodedToken.user.userId);
        } else {
          setEditLoggedUser(false);
          setUserId(propsUserId);
        }
      })
      .catch(error => {
        setEditLoggedUser(false);
      });
  }

  useEffect(() => {
    fetchLoggedUser();
  } , []);

  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar admin */}
      <Sidebar />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Edit user</h2>

        {userId &&
          <>
            <EditUserForm userId={userId} editLoggedUser={editLoggedUser} />
            {editLoggedUser &&
              <ManagePermissions userId={userId} />
            }
          </>
        }
      </main>
    </section>
  );
}
