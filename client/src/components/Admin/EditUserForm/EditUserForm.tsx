import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Backend settings
import { baseUrl, axiosHeaders } from '../../data';

type Props = {
  newUserId: string;
};

// interface PermissionModel {

// }

export default function EditUserForm({ newUserId }: Props) {
  // Form's inputs
  const [ userId, setUserId ] = useState('')
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ permission, setPermission ] = useState('')
  const [ event, setEvent ] = useState('')
  const [ date, setDate ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ editLoggedUser, setEditLoggedUser ] = useState(false)
  const [ permissions, setPermissions ] = useState([])

  const fetchLoggedUser = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    await axios.get(`${baseUrl}/api/v1/auth/check-token`, axiosHeaders)
      .then(res => {
        if (res.data && !newUserId) {
          setEditLoggedUser(true);
          setUserId(res.data.id);
          fetchUser(res.data.id);
        } else if (newUserId && newUserId === res.data.id) {
          setEditLoggedUser(true);
          setUserId(res.data.id);
          fetchUser(res.data.id);
        } else {
          setEditLoggedUser(false);
          setUserId(newUserId);
          fetchUser(newUserId);
        }
      })
      .catch(error => {
        setEditLoggedUser(false);
      });
  }

  const fetchPermissions = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    await axios.get(`${baseUrl}/api/v1/permissions`, axiosHeaders)
      .then(res => {
        if (res.data.Permissions) {
          setPermissions(res.data.Permissions);
          console.log(Permissions);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchUser = async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/users/${id}`)
      const user = res.data.user;
      if (user) {
        // Set login
        setLogin(user.login);
        // Set event name
        setEvent(user.event);
        // Set permission
        setPermission(user.permission.value);

        // Set event date
        if (user.date.date) {
          const date = new Date(user.date.date);
          setDate(date.toISOString().substring(0,10));
        } else {
          setDate('');
        }

        // Set event expiration date
        if (user.date.expiratioDate) {
          const expiratioDate = new Date(user.date.expiratioDate);
          setExpiryDate(expiratioDate.toISOString().substring(0,10));
        } else {
          setExpiryDate('');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Send request to server to edit user
   * @param {Object} e Event handler
   */
  const editUserForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    axios.patch(`${baseUrl}/api/v1/users`, {
        userId: userId,
        login: login,
        password: password,
        permission: permission,
        event: event,
        date: date,
        expiryDate: expiryDate
      })
      .then((response) => {
        console.log(response);
        fetchUser(userId);
      })
      .catch((error) => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
        }
      });
  }
  
  interface DeleteUserModel {
    userId: string;
  }

  /**
   * Send requst to user to delete user
   */
  const deleteUser = () => {
    axios.delete(`${baseUrl}/api/v1/users`, {
        data: { userId: userId }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
        }
      });
  }

  useEffect(() => {
    if (newUserId) {
      setUserId(newUserId);
    }
    fetchLoggedUser();
    fetchPermissions();
  } , []);

  return (
    <article className="w-100">
      <form
        id="edit-user-form"
        className="col-sm-12 col-xl-11 row p-4 mx-auto"
        onSubmit={editUserForm}>
        <h5 className="w-100 px-2 pb-2 mb-4 border-bottom">
          {userId ?
            <span>Managing your own account</span>
            :
            <span>Management</span>
          }
        </h5>

        {/* Login */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
          <input
            type="text"
            name="edit-login"
            id="edit-login"
            placeholder=" "
            required
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={login}
            onChange={(e)=>setLogin(e.target.value)} />
          <label
            htmlFor="edit-login"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Login
          </label>
        </div>

        {/* Password */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
          <input
            type="password"
            name="edit-password"
            id="edit-password"
            placeholder=" "
            required
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          <label
            htmlFor="edit-password"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Password
          </label>
        </div>

        {/* Description */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
          <input
            type="text"
            name="edit-description"
            id="edit-description"
            placeholder=" "
            required
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={event}
            onChange={(e)=>setEvent(e.target.value)} />
          <label
            htmlFor="edit-description"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Description
          </label>
        </div>

        {/* Event date */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
          <input
            type="date"
            name="edit-event-date"
            id="edit-event-date"
            placeholder=" "
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={date}
            onChange={(e)=>setDate(e.target.value)} />
          <label
            htmlFor="edit-event-date"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Event date
          </label>
          <p className="pt-2 m-0 small">(optionally)</p>
        </div>

        {/* Expiration date */}
        {editLoggedUser &&
          <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
            <input
              type="date"
              name="edit-expiration"
              id="edit-expiration"
              placeholder=" "
              className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
              value={expiryDate}
              onChange={(e)=>setExpiryDate(e.target.value)} />
            <label
              htmlFor="edit-expiration"
              className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
              Expiration date
            </label>
            <p className="pt-2 m-0 small">(optionally)</p>
          </div>
        }

        {/* Permission */}
        {editLoggedUser &&
          <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
            <p
              className="ps-3 m-0 form-label-custom"
              style={{paddingTop: 2 + 'px'}}>
              Permission
            </p>
            <select
              name="permission"
              id="permission"
              className="form-control py-0 mt-0 bg-transparent form-control-custom form-control-custom-select text-theme"
              value={permission}
              onChange={(e)=>setPermission(e.target.value)}>
              {/* {permissions.map((item, index) => {
                return (
                  <option key={index}>{item.value}</option>
                )
              })} */}
            </select>
          </div>
        }

        <div className="form-group col-lg-12 px-0 py-3">
          {/* Submit */}
          <button
            type="submit"
            className="btn btn-sm p-2 m-1 fw-bold text-hover-custom">
            Submit
          </button>

          {/* Refresh */}
          <button
            type="button"
            className="btn btn-sm p-2 m-1 fw-bold text-hover-theme"
            onClick={()=>fetchUser(userId)}>
            Refresh
            <i className="icon-arrows-ccw h6"></i>
          </button>

          {/* Expire */}
          {!editLoggedUser &&
            <button
              type="submit"
              className="btn btn-sm p-2 m-1 fw-bold text-hover-theme"
              onClick={()=>setExpiryDate('')}>
              Expire
            </button>
          }

          {/* Delete */}
          {!editLoggedUser &&
            <button
              type="button"
              className="btn btn-sm p-2 m-1 fw-bold text-hover-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={deleteUser}>
              Delete
            </button>
          }
        </div>
      </form>
    </article>
  );
}
