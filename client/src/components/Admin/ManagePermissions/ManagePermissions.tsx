import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Backend settings
import {
  baseUrl,
  axiosHeaders,
  PermissionModel,
  getTokenDecoded,
  TokenModel
} from '../../data';

// Import components
import Switch from './Switch';

type Props = {
  userId: string;
}

export default function ManagePermissions({ userId }: Props) {
  const [ permissions, setPermissions ] = useState<PermissionModel[]>([]);
  const addPermission: string[] = [];
  const deletePermission: string[] = [];

  const fetchPermissions = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    await axios.get(`${baseUrl}/api/v1/permissions`, axiosHeaders)
      .then(res => {
        if (res.data.permissions) {
          separatePermission(res.data.permissions);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const separatePermission = (newPermissions: PermissionModel[]) => {
    const decodedToken: TokenModel = getTokenDecoded();

    // Check permission like binary
    newPermissions.forEach((permission: PermissionModel, i: number) => {
      permission.checked = decodedToken.user.permission & 2**i ? true : false;
    });

    setPermissions(newPermissions);
  }

  const changePermission = async (name: string, checked: boolean) => {
    // If token in local storage is set
    if (!localStorage.token) return;

    if (checked) {
      addPermission.push(name);
    } else {
      deletePermission.push(name);
    }

    axios.patch(`${baseUrl}/api/v1/permissions`, {
      userId: userId,
      addPermission: addPermission,
      deletePermission: deletePermission
    }, axiosHeaders)
    .then((response) => {
      // Set token from local storage
      localStorage.setItem('token', response.data.token);
      console.log(response);
      fetchPermissions();
    })
    .catch(error => {
      if (error.response.data.msg) {
        console.log(error.response.data.msg);
        // setLoginResponse(error.response.data.msg);
      }
    })
  }

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <article className="col-sm-12 col-xl-11 row p-4 mx-auto">
      <h5 className="w-100 px-2 pb-2 mb-4 border-bottom">Permission</h5>

      <div className="w-100 px-3">
        {permissions.map((permission, index) => {
          return (
            <Switch
              key={index}
              name={permission.name}
              description={permission.description}
              checked={permission.checked}
              changePermission={changePermission} />
          )
        })}
      </div>
    </article>
  )
}