import React, { useEffect, useState } from 'react';
import axios from 'axios'

export default function EditUserForm({ newUserId }) {
  // Form's inputs
  const [ userId, setIserId ] = useState('')
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ eventName, setEventName ] = useState('')
  const [ eventDate, setEventDate ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ editLoggedUser, setEditLoggedUser ] = useState(false)
  
  const fetchLoggedUser = async () => {
    try {
      const res = await axios.get('/api/v1/auth/check-session');
      if (res.data && !newUserId) {
        setEditLoggedUser(true);
        setIserId(res.data.id);
        fetchUser(res.data.id);
      } else if (newUserId && newUserId === res.data.id) {
        setEditLoggedUser(true);
        setIserId(res.data.id);
        fetchUser(res.data.id);
      } else {
        setEditLoggedUser(false);
        setIserId(newUserId);
        fetchUser(newUserId);
      }
    } catch (error) {
      console.log(error);
      setEditLoggedUser(false);
    }
  }

  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`)
      const user = res.data.user;
      if (user) {
        // Set login
        setLogin(user.login);
        // Set event name
        setEventName(user.event);

        // Set event date
        if (user.date.date) {
          const date = new Date(user.date.date);
          setEventDate(date.toISOString().substring(0,10));
        } else {
          setEventDate('');
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
  const editUserForm = (e) => {
    e.preventDefault();

    axios.post('/api/v1/user', {
        userId: userId,
        login: login,
        password: password,
        eventName: eventName,
        eventDate: eventDate,
        expiryDate: expiryDate
      })
      .then((response) => {
        console.log(response);
        fetchUser();
      })
      .catch((error) => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
          // setLoginResponse(error.response.data.msg);
        }
      });
  }

  /**
   * Send requst to user to delete user
   */
  const deleteUser = () => {
    axios.delete('/api/v1/user', {
        userId: userId
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
        }
      });

  }

  useEffect(() => {
    if (newUserId) {
      setIserId(newUserId);
    }
    fetchLoggedUser();
  } , [])

  return (
    <article className="w-100">
      <form
        className="col-sm-12 col-xl-11 row p-4 mx-auto"
        onSubmit={()=>editUserForm}>
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
            htmlor="edit-login"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Login
          </label>
        </div>
        
        {/* Password */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-4 form-group-custom">
          <input
            type="text"
            name="edit-password"
            id="edit-password"
            placeholder=" "
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          <label
            htmlor="edit-password"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Password
          </label>
        </div>
        
        {/* Description */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-2 form-group-custom">
          <input
            type="text"
            name="edit-description"
            id="edit-description"
            placeholder=" "
            required
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={eventName}
            onChange={(e)=>setEventName(e.target.value)} />
          <label
            htmlor="edit-description"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Description
          </label>
        </div>

        {/* Event date */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-2 form-group-custom d-none">
          <input
            type="date"
            name="edit-event-date"
            id="edit-event-date"
            placeholder=" "
            required
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={eventDate}
            onChange={(e)=>setEventDate(e.target.value)} />
          <label
            htmlor="edit-event-date"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Event date
          </label>
        </div>
    
        {/* Expiration date */}
        <div className="form-group col-sm-12 col-xl-6 px-0 px-xl-4 mb-2 form-group-custom">
          <input
            type="date"
            name="edit-expiration"
            id="edit-expiration"
            placeholder=" "
            required
            className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
            value={expiryDate}
            onChange={(e)=>setExpiryDate(e.target.value)} />
          <label
            htmlor="edit-expiration"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Expiratio date
          </label>
        </div>

        <div className="form-group col-lg-12 px-0 py-3">
            {/* Submit */}
            <button
              type="submit"
              className="btn btn-sm p-2 m-1 fw-bold text-hover-custom"
              // v-on:click="Client_vue.upload_client('cooperator_info')"
              >
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
            {editLoggedUser &&
              <button
                type="button"
                className="btn btn-sm p-2 m-1 fw-bold text-hover-theme"
                // v-on:click="App_vue.confirm_window_f(Client_vue.Client, 'user')"
                >
                Expire
              </button>
            }

            {/* Delete */}
            {editLoggedUser &&
              <button
                type="button"
                className="btn btn-sm p-2 m-1 fw-bold text-hover-danger"
                data-bs-dismiss="modal" aria-label="Close"
                onClick={deleteUser}>
                Delete
              </button>
            }
        </div>
      </form>
    </article>
  )
}
