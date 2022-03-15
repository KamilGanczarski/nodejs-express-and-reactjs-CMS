import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

// Utils
import { TokenModel } from '../utils/interfaces';
import {
  baseUrl,
  axiosHeaders,
  redirectAfterLogin,
  getTokenDecoded,
  redirectTo
} from '../utils/tokenAPI';

// Components
import CustomInput from '../components/CustomElements/CustomInput';

// Style
import '../sassStyles/pages/login.scss';

type Props = {};

export default function SetOwnPassword({}: Props) {
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ loginResponse, setLoginResponse ] = useState('');

  const setLoginFromToken = () => {
    const decodedToken: TokenModel = getTokenDecoded();
    setLogin(decodedToken.user.login);

    // Redirect if no need to change password
    if (!decodedToken.user.changePassword) {
      redirectTo('/login');
    }
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If token in local storage is set
    if (!localStorage.token) return;

    if (password !== repeatPassword) {
      setLoginResponse('Passwords should be the same');
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

  useEffect(() => {
    setLoginFromToken();
  }, []);

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
            <div className="w-100 px-0">
              <CustomInput
                type='text'
                name='login'
                label='Login'
                value={login}
                setValue={setLogin}
                optional={false}
                disabled={true}
                pxLg='0' />
            </div>

            {/* Password */}
            <div className="w-100 px-0">
              <CustomInput
                type='password'
                name='password'
                label='New password'
                value={password}
                setValue={setPassword}
                optional={false}
                disabled={false}
                pxLg='0' />
            </div>

            {/* Repeat password */}
            <div className="w-100 px-0">
              <CustomInput
                type='password'
                name='repeat-password'
                label='Repeat new password'
                value={repeatPassword}
                setValue={setRepeatPassword}
                optional={false}
                disabled={false}
                pxLg='0' />
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
