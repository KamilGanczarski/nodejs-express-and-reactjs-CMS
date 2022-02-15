import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

// Backend settings
import {
  baseUrl,
  redirectIValidToken,
  redirectAfterLogin,
  redirectTo,
  TokenModel
} from '../components/data';

// Style
import '../sassStyles/pages/login.scss';

type Props = {};

export default function Login({}: Props) {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginResponse, setLoginResponse ] = useState('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Remove token from local storage
    localStorage.removeItem('token');
    setLoginResponse('');

    await axios.post(`${baseUrl}/api/v1/auth/login`, {
        login: login,
        password: password
      })
      .then((response) => {
        if (response.data.token) {
          // Set token from local storage
          localStorage.setItem('token', response.data.token);
          const decodedToken: TokenModel = jwt_decode(response.data.token);
          if (decodedToken.user.changePassword) {
            redirectTo('/change-password', `${login}`);
          } else {
            redirectAfterLogin(decodedToken.user.role);
          }
        }
      })
      .catch(error => {
        setPassword('');
        if (error.response.data.msg) {
          setLoginResponse(error.response.data.msg);
        }
      });
  }

  useEffect(() => {
    redirectIValidToken()
  }, []);

  return (
    <section className="w-100 prevent-user-select login-main">
      <div className="container form">
        <div className="p-5 shadow-custom">
          {/* Title */}
          <h4 className="mb-4 text-center text-white">
            Sign in to your gallery
          </h4>

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
              <label className="form-label-custom ps-3" htmlFor="password">
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
  );
}
