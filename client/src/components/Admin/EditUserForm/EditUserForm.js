import React, { useEffect, useState } from 'react';
import axios from 'axios'

export default function EditUserForm({ userId }) {
  // Form's inputs
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ eventDate, setEventDate ] = useState('')
  const [ editLoggedUser, setEditLoggedUser ] = useState(false)
  
  const fetchLoggedUser = async () => {
    try {
      const res = await axios.get('/api/v1/check-session');
      if (res.data) {
        fetchUser(res.data.id);
      }
      setEditLoggedUser(true);
    } catch (error) {
      console.log(error);
      fetchUser(userId);
    }
  }

  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`)
      const user = res.data.user;
      if (user) {
        setLogin(user.login);
        setDescription(user.event);
        user.date.date = new Date(user.date.date)
        setEventDate(`${user.date.date.getFullYear()}-${user.date.date.getMonth()}-${user.date.date.getDate()}`);
      }
      setEditLoggedUser(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLoggedUser();
  } , [])

  return (
    <article className="w-100">
      <form className="col-sm-12 col-xl-11 row p-4 mx-auto">
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
            required
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
            value={description}
            onChange={(e)=>setDescription(e.target.value)} />
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
            value={eventDate}
            onChange={(e)=>setEventDate(e.target.value)} />
          <label
            htmlor="edit-expiration"
            className="form-label-custom ps-3 ps-xl-4 ms-xl-3">
            Event date
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
              // v-on:click="Client_vue.fetch_client()"
              >
              Refresh
              {/* <i class="icon-arrows-ccw h6"></i> */}
            </button>
        
            {/* Expire */}
            <button
              type="button"
              // v-if="App_vue.Session.id != Client_vue.Client.id"
              className="btn btn-sm p-2 m-1 fw-bold text-hover-theme">
              Expire
            </button>

            {/* Delete */}
            <button
              type="button"
              // v-if="App_vue.Session.id != Client_vue.Client.id"
              className="btn btn-sm p-2 m-1 fw-bold text-hover-danger"
              data-bs-dismiss="modal" aria-label="Close"
              // v-on:click="App_vue.confirm_window_f(Client_vue.Client, 'user')"
              >
              Delete
            </button>
        </div>
      </form>
    </article>
  )
}
