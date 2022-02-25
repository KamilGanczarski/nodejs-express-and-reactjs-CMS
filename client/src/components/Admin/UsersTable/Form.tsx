import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Componenets
import CustomInput from '../../CustomInput/CustomInput';

type Props = {
  userType: string;
  fetchData: () => void;
};

export default function Form({ userType, fetchData }: Props) {
  // Form input values
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ event, setEvent ] = useState('');
  const [ date, setDate ] = useState('');
  const [ expiryDate, setExpiryDate ] = useState('');

  const showEventDate = (): string => {
    if (userType === 'cooperator') {
      return 'col-sm-12 mb-4 d-none';
    } else {
      return 'col-sm-12 col-xl-6 mb-4 ps-1';
    }
  }

  const showExpiryDate = (): string => {
    if (userType === 'cooperator') {
      return 'col-sm-12 mb-4';
    } else {
      return 'col-sm-12 col-xl-6 mb-4 pe-1';
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios.post(`${baseUrl}/api/v1/users`, {
        login: login,
        password: password,
        event: event,
        date: date,
        expiryDate: expiryDate,
        role: userType
      }, axiosHeaders)
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
  const setValuesHiddenInputs = (): void => {
    if (userType === 'portfolio history wedding') {
      setLogin(userType);
      setPassword('*');
    }
  }

  useEffect(() => {
    setValuesHiddenInputs();
  }, []);

  return (
    <section
      className="modal fade bd-example-modal-lg"
      id="add-customer-modal"
      tabIndex={-1}
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
              }

              {/* Password */}
              {!['portfolio history wedding'].includes(userType) &&
                <div className="w-100 px-0">
                  <CustomInput
                    type='password'
                    name='password'
                    label='Password'
                    value={password}
                    setValue={setPassword}
                    optional={false}
                    disabled={false}
                    pxLg='0' />
                </div>
              }

              {/* Event name */}
              <div className="w-100 px-0 mb-3">
                <CustomInput
                  type='text'
                  name='event'
                  label='Event name'
                  value={event}
                  setValue={setEvent}
                  optional={false}
                  disabled={false}
                  pxLg='0' />
              </div>

              {/* Event date */}
              <div className={showEventDate()}>
                <CustomInput
                  type='date'
                  name='event-date'
                  label='Event date'
                  value={date}
                  setValue={setDate}
                  optional={true}
                  disabled={false}
                  pxLg='0' />
              </div>

              {/* Expiry date */}
              <div className={showExpiryDate()}>
                <CustomInput
                  type='date'
                  name='expiry-date'
                  label='Expiration date'
                  value={expiryDate}
                  setValue={setExpiryDate}
                  optional={true}
                  disabled={false}
                  pxLg='0' />
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
  );
}
