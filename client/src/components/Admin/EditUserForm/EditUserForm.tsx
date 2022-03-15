import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { RoleModel } from '../../../utils/interfaces';
import { baseUrl, axiosHeaders, redirectTo } from '../../../utils/tokenAPI';

// Componenets
import CustomInput from '../../CustomElements/CustomInput';

type Props = {
  userId: string;
  editLoggedUser: boolean;
};

export default function EditUserForm({ userId, editLoggedUser }: Props) {
  // Form's inputs
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ role, setRole ] = useState('');
  const [ event, setEvent ] = useState('');
  const [ date, setDate ] = useState('');
  const [ expiryDate, setExpiryDate ] = useState('');
  const [ roles, setRoles ] = useState<RoleModel[]>([]);

  const fetchRoles = async () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    await axios.get(`${baseUrl}/api/v1/roles`, axiosHeaders)
      .then(res => {
        if (res.data.roles) {
          setRoles(res.data.roles);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchUser = async (id: string) => {
    // If token in local storage is set
    if (!localStorage.token) return;

    try {
      const res = await axios.get(`${baseUrl}/api/v1/users/${id}`, axiosHeaders)
      const user = res.data.user;
      if (user) {
        // Set login
        setLogin(user.login);
        // Set event name
        setEvent(user.event);
        // Set role
        setRole(user.roles[0].value);

        // Set event date
        if (user.date) {
          const date = new Date(user.date);
          setDate(date.toISOString().substring(0,10));
        } else {
          setDate('');
        }

        // Set event expiration date
        if (user.expirydate) {
          const expirydate = new Date(user.expirydate);
          setExpiryDate(expirydate.toISOString().substring(0,10));
        } else {
          setExpiryDate('');
        }
      }
    } catch (error) {
      redirectTo('/admin/home');
      console.log(error);
    }
  }

  /**
   * Send request to server to edit user
   * @param {Object} e Event handler
   */
  const editUserForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // If token in local storage is set
    if (!localStorage.token) return;

    axios.patch(`${baseUrl}/api/v1/users`, {
        userId: userId,
        login: login,
        password: password,
        role: role,
        event: event,
        date: date,
        expiryDate: expiryDate
      }, axiosHeaders)
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
  
  /**
   * Send requst to user to delete user
   */
  const deleteUser = () => {
    // If token in local storage is set
    if (!localStorage.token) return;

    axios.delete(`${baseUrl}/api/v1/users`, {
        data: { id: userId },
        headers: axiosHeaders.headers
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
    fetchUser(userId);
    fetchRoles();
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
        <div className="col-sm-12 col-xl-6 px-0 mb-3">
          <CustomInput
            type='text'
            name='edit-login'
            label='Login'
            value={login}
            setValue={setLogin}
            optional={false}
            disabled={false}
            pxLg='4' />
        </div>

        {/* Password */}
        <div className="col-sm-12 col-xl-6 px-0 mb-3">
          <CustomInput
            type='password'
            name='edit-password'
            label='Password'
            value={password}
            setValue={setPassword}
            optional={false}
            disabled={false}
            pxLg='4' />
        </div>

        {/* Description */}
        <div className="col-sm-12 col-xl-6 px-0 mb-3">
          <CustomInput
            type='text'
            name='edit-description'
            label='Description'
            value={event}
            setValue={setEvent}
            optional={false}
            disabled={false}
            pxLg='4' />
        </div>

        {/* Role */}
        {!editLoggedUser &&
          <div className="col-sm-12 col-xl-6 px-0 px-xl-4 mb-3">
            <div className="form-group px-0 mb-4 form-group-custom">
              <p
                className="ps-3 m-0 form-label-custom"
                style={{paddingTop: 8 + 'px', fontSize: 0.75 + 'rem'}}>
                Role
              </p>
              <select
                name="permission"
                id="permission"
                className="form-control py-0 mt-0 bg-transparent form-control-custom form-control-custom-select text-theme"
                value={role}
                onChange={(e)=>setRole(e.target.value)}>
                {roles.map((item: RoleModel, index) => {
                  return (
                    <option key={index}>{item.value}</option>
                  )
                })}
              </select>
            </div>
          </div>
        }

        {/* Event date */}
        <div className="col-sm-12 col-xl-6 px-0">
          <CustomInput
            type='date'
            name='edit-event-date'
            label='Event date'
            value={date}
            setValue={setDate}
            optional={true}
            disabled={false}
            pxLg='4' />
        </div>

        {/* Expiration date */}
        {!editLoggedUser &&
          <div className="col-sm-12 col-xl-6 px-0">
            <CustomInput
              type='date'
              name='edit-expiration'
              label='Expiration date'
              value={expiryDate}
              setValue={setExpiryDate}
              optional={true}
              disabled={false}
              pxLg='4' />
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
