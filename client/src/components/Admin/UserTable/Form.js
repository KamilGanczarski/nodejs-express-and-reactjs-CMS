import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Form({ userType, fetchData }) {
  // Form input values
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ eventName, setEventName ] = useState('')
  const [ eventDate, setEventDate ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')

  const showEventDate = () => {
    if (userType === 'cooperator')
      return 'form-group col-sm-12 p-0 mb-4 form-group-custom d-none';
    else
      return 'form-group col-sm-12 col-lg-6 p-0 p-0 pe-lg-3 mb-4 form-group-custom';
  }

  const showExpiryDate = () => {
    if (userType === 'cooperator')
      return 'form-group col-sm-12 p-0 mb-4 form-group-custom';
    else
      return 'form-group col-sm-12 col-lg-6 p-0 ps-lg-3 mb-4 form-group-custom';
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/v1/user', {
        login: login,
        password: password,
        eventName: eventName,
        eventDate: eventDate,
        expiryDate: expiryDate,
        permission: userType
      })
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch(error => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
          // setLoginResponse(error.response.data.msg);
        }
      })
  }

    // The inputs that are hidden
    const setValuesHiddenInputs =() => {
    if (userType === 'portfolio history wedding') {
      setLogin(userType);
      setPassword('*');
    }
  }

  useEffect(() => {
    setValuesHiddenInputs();
  }, [])

  return (
    <section
      className="modal fade bd-example-modal-lg"
      id="add-client-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        className="modal-dialog modal-lg modal-dialog-center"
        role="document">
        <div className="modal-content border-0 bg-theme text-theme">
          <div className="modal-header d-flex align-items-start border-0">
            {/* Title */}
            <h4 className="modal-title py-5 text-center title-with-x-btn">
              Add
            </h4>
            {/* Close window */}
            <button
              className="btn btn-sm p-2 bg-transparent text-hover-theme"
              data-bs-dismiss="modal"
              aria-label="Close">
              <i className="icon-cancel h4 m-0"></i>
            </button>
          </div>
          <div className="modal-body w-100 row px-4 px-lg-5 pt-0 pb-5 m-0 justify-content-center">
            <form
              className="w-100 row px-4 m-0 justify-content-center"
              onSubmit={onSubmitHandler}>
              {/* Login */}
              {!['portfolio history wedding'].includes(userType) &&
                <div className="form-group w-100 px-0 mb-4 form-group-custom">
                  <input
                    type="text"
                    id="login"
                    name="login"
                    placeholder=" "
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)}
                    required
                    className="form-control-custom w-100 px-3 py-4 mt-3 text-theme" />
                  <label className="form-label-custom ps-3" htmlFor="login">
                    Login
                    </label>
                </div>
              }

              {/* Password */}
              {!['portfolio history wedding'].includes(userType) &&
                <div className="form-group w-100 px-0 mb-4 form-group-custom">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    className="form-control-custom w-100 px-3 py-4 mt-3 text-theme" />
                  <label className="form-label-custom ps-3" htmlFor="password">
                    Password
                  </label>
                </div>
              }

              {/* Event name */}
              <div className="form-group w-100 px-0 mb-4 form-group-custom">
                <input
                  type="text"
                  id="event_name"
                  name="event_name"
                  placeholder=" "
                  value={eventName}
                  onChange={(e)=>setEventName(e.target.value)}
                  required
                  className="form-control-custom w-100 px-3 py-4 mt-3 text-theme" />
                <label className="form-label-custom ps-3" htmlFor="event_name">
                  Event name
                </label>
              </div>

              <div className="form-group w-100 px-0 row pb-4 mx-0 mb-0">
                {/* Event date */}
                <div className={showEventDate()}>
                  <input
                    type="date"
                    id="event_date"
                    name="event_date"
                    placeholder=" "
                    value={eventDate}
                    onChange={(e)=>setEventDate(e.target.value)}
                    className="form-control-custom w-100 px-3 py-4 mt-3 text-theme" />
                  <label
                    className="form-label-custom ps-3"
                    htmlFor="event_date">
                    Event date (optional)
                  </label>
                </div>

                {/* Expiry date */}
                <div className={showExpiryDate()}>
                  <input
                    type="date"
                    id="expiry_date"
                    name="expiry_date"
                    placeholder=" "
                    value={expiryDate}
                    onChange={(e)=>setExpiryDate(e.target.value)}
                    className="form-control-custom w-100 px-3 py-4 mt-3 text-theme" />
                  <label
                    className="form-label-custom ps-3"
                    htmlFor="expiry_date">
                    Expiration date (optional)
                  </label>
                </div>
              </div>

              <input type="hidden" name="permission" value={userType} />

              <button
                type="submit"
                className="btn btn-sm w-auto px-4 m-1 bg-theme-inv">
                <span className="fw-bold text-theme-inv">Add</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
