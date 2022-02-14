import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";

// Backend settings
import {
  baseUrl,
  redirectAfterLogin,
  axiosHeaders,
  TokenModel
} from '../components/data';

// Style
import '../sassStyles/pages/login.scss';

type Props = {}
interface ChangePasswordParamsModel {
  login: string;
}

export default function SetOwnPassword({}: Props) {
  const params: ChangePasswordParamsModel = useParams();
  const login = params.login;
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ loginResponse, setLoginResponse ] = useState('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If token in local storage is set
    if (!localStorage.token) return;

    if (password !== repeatPassword) {
      setLoginResponse('Passwords should by the same');
      return;
    }

    setLoginResponse('');

    await axios.post(`${baseUrl}/api/v1/auth/change-password`, {
        login: login,
        password: password
      }, axiosHeaders)
      .then((response) => {
        if (response.data.token) {
          // Set token from local storage
          localStorage.setItem('token', response.data.token);
          const decodedToken: TokenModel = jwt_decode(response.data.token);
          redirectAfterLogin(decodedToken.user.role);
        }
      })
      .catch(error => {
        if (error.response.data.msg) {
          setLoginResponse(error.response.data.msg);
        }
      });
  }

  return (
    <section className="w-100 prevent-user-select login-main">
      <div className="container form">
        <div className="p-5 shadow-custom">
          {/* Title */}
          <h4 className="mb-4 text-center text-white">
            Change your password due to your own safety
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
                disabled />
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
                New password
              </label>
            </div>

            {/* Repeat password */}
            <div className="form-group w-100 mt-2 form-group-custom">
              <input
                type="password"
                name="password"
                id="password"
                placeholder=" "
                required
                className="form-control-custom w-100 px-3 py-4 mt-3 text-light"
                value={repeatPassword}
                onChange={(e)=>setRepeatPassword(e.target.value)} />
              <label className="form-label-custom ps-3" htmlFor="pass">
                Repeat new password
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
              <span className="fw-bold">Confirm</span>
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
