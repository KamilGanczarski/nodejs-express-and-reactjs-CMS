import React, { useEffect, useState } from 'react'
import  { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../sassStyles/pages/login.scss'

export default function Login() {
  const [ auth, setAuth ] = useState(false)
  const [ login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loginResponse, setLoginResponse ] = useState('')

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/v1/check-session');
      if (res.data.login) {
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/v1/auth/login', {
        login: login,
        password: password
      })
      .then((response) => {
        setLoginResponse('');
        setAuth(true);
      })
      .catch(error => {
        if (error.response.data.msg) {
          setLoginResponse(error.response.data.msg);
        }
      })
  }

  if (auth) {
    return <Redirect to='/admin/home' />
  }

  return (
    <section className="w-100 prevent-user-select login-main">
      <div className="container form">
        <div className="p-5 shadow-custom">
          {/* Title */}
          <h4 className="text-center text-white">Sign in to your gallery</h4>

          {/* Form */}
          <form
            className="login-form"
            onSubmit={onSubmitHandler}>
            {/* Login */}
            <div className="form-group w-100 form-group-custom">
              <input
                type="text"
                name="login"
                id="login"
                placeholder=" "
                required
                className="form-control-custom w-100 px-3 py-4 mt-3 text-light"
                value={login}
                onChange={(e)=>setLogin(e.target.value)} />
              <label className="form-label-custom ps-3" htmlFor="login">
                Login
              </label>
            </div>

            {/* Password */}
            <div className="form-group w-100 mt-2 form-group-custom">
              <input
                type="password"
                name="password"
                id="password"
                placeholder=" "
                required
                className="form-control-custom w-100 px-3 py-4 mt-3 text-light"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
              <label className="form-label-custom ps-3" htmlFor="pass">
                Password
              </label>
            </div>

            {/* Response */}
            <div className={`w-100 ${!loginResponse && 'd-none'}`}>
              <div className="w-100 row ps-1 mx-0 mt-4 d-flex">
                <div className="d-flex align-items-end w-auto">
                  <i className="icon-user text-black"></i>
                </div>
                <button
                  type="button"
                  className="btn w-auto mx-0 bg-shadow text-error">
                    {loginResponse}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" 
              className="btn btn-sm btn-md btn-ghost w-100 py-2 mt-4">
              <span className="fw-bold">Log in</span>
            </button>

            {/* reCAPTCHA */}
            {/* <input
              type="hidden"
              className="g-rechaptcha-response"
              name="g-rechaptcha-response" />
            <button
              className="g-recaptcha d-none"
              data-sitekey="SITE_KEY"
              data-callback="on_submit_recaptcha">
            </button> */}
          </form>
        </div>
      </div>
    </section>
  )
}
