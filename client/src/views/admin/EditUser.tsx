import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Utils
import { UserModel, TokenModel } from '../../utils/interfaces';
import { baseUrl, axiosHeaders, getTokenDecoded } from '../../utils/tokenAPI';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import EditUserForm from '../../components/Admin/EditUserForm/EditUserForm'
import ManagePermissions from '../../components/Admin/ManagePermissions/ManagePermissions'

// Data
import { sidebarLinks } from '../../components/Sidebar/data';

interface EditUserParams {
  propsUserId: string;
}

type Props = {};

export default function EditUser({}: Props) {
  const { propsUserId } = useParams<EditUserParams>();

  const [ userId, setUserId ] = useState('');
  const [ User, setUser ] = useState<UserModel>();
  const [ editLoggedUser, setEditLoggedUser ] = useState(false);

  const checkUser = () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    const decodedToken: TokenModel = getTokenDecoded();
    let currectUserId: string = '';
    if (!propsUserId || propsUserId === decodedToken.user.userId) {
      setEditLoggedUser(true);
      currectUserId = decodedToken.user.userId;
    } else {
      setEditLoggedUser(false);
      currectUserId = propsUserId;
    }
    setUserId(currectUserId);
    fetchCurrentUser(currectUserId);
  }

  const fetchCurrentUser = async (id: string) => {
    await axios.get(`${baseUrl}/api/v1/users/${id}`, axiosHeaders)
      .then(res => {
        setUser(res.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    checkUser();
  } , []);

  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar */}
      <Sidebar links={sidebarLinks} />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Edit user</h2>

        {userId &&
          <>
            <EditUserForm userId={userId} editLoggedUser={editLoggedUser} />
            {!editLoggedUser && User &&
              <ManagePermissions
                userId={userId}
                permission={User.permission}
                fetchCurrentUser={fetchCurrentUser} />
            }
          </>
        }
      </main>
    </section>
  );
}
