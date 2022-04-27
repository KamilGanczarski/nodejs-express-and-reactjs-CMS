import React, { useEffect, useState } from 'react';

// Utils
import {
  redirectIfValidToken,
  loginToServer
} from '../utils/tokenAPI';

// Components
import CustomInput from '../components/CustomElements/CustomInput';

// Style
import '../sassStyles/pages/login.scss';

type Props = {};

export default function Login({}: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Remove token from local storage
    localStorage.removeItem('token');
    setLoginResponse('');

    const response = await loginToServer(login, password);
    console.log(response)
    setPassword('');
    setLoginResponse(response);
  }

  useEffect(() => {
    redirectIfValidToken()
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
            <div className="w-100 px-0">
              <CustomInput
                type='text'
                name='login'
                label='Login'
                value={login}
                setValue={setLogin}
                optional={false}
                disabled={false}
                pxLg='0' />
            </div>

            {/* Password */}
            <div className="w-100 px-0">
              <CustomInput
                type='password'
                name='edit-password'
                label='Password'
                value={password}
                setValue={setPassword}
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
