import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';
import { fetchUsersParams } from '../../../utils/interfaces';

// Components
import CustomModal from '../../CustomElements/Modal/CustomModal';
import CustomInput from '../../CustomElements/CustomInput';
import CustomInputNumber from '../../CustomElements/CustomInputNumber';
import CustomSwitch from '../../CustomElements/CustomSwitch';

type Props = {
  userType: string;
  fetchData: ({}: fetchUsersParams) => void;
};

export default function Form({ userType, fetchData }: Props) {
  // Form input values
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [contract, setContract] = useState(false);
  const [price, setPrice] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [howMuchPaid, setHowMuchPaid] = useState(0);

  const showEventDate = (): string => {
    return ['customer', 'event'].includes(userType)
      ? 'col-sm-12 col-xl-6 mb-4 ps-0'
      : 'col-sm-12 mb-4 d-none';
  }

  const showExpiryDate = (): string => {
    return ['customer', 'event'].includes(userType)
      ? 'col-sm-12 col-xl-6 mb-4 pe-0'
      : 'col-sm-12 mb-4';
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios.post(`${baseUrl}/api/v1/users`, {
        login,
        password,
        event,
        date,
        expiryDate,
        contract,
        price,
        advance,
        howMuchPaid,
        role: userType
      }, axiosHeaders)
      .then((response) => {
        console.log(response);
        fetchData({ sort: '', filter: '', page: 0, perPage: 0 });
      })
      .catch(error => {
        if (error.response.data.msg) {
          console.log(error.response.data.msg);
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

  const changeContractBool = (name: string, checked: boolean) => {
    setContract(checked);
  }

  useEffect(() => {
    setValuesHiddenInputs();
  }, []);

  return (
    <CustomModal title="Add user" btnIdName="add-user" size="lg">
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
            optional={false}
            disabled={false}
            pxLg='0' />
        </div>

        {/* Contract */}
        <div className="w-100 row pb-3 m-0">
          <CustomSwitch
            name='contract'
            checked={contract}
            changeValue={changeContractBool}
            disabled={false} />
          <span className="w-auto ps-3 align-top">Contract</span>
          {/* Optionaly text */}
          <p className="pt-2 m-0 small">(optionally)</p>
        </div>

        {/* Price */}
        <div className="w-100 px-0 mb-3">
          <CustomInputNumber
            type='text'
            name='price'
            label='Price'
            value={price}
            setValue={setPrice}
            optional={true}
            disabled={false}
            pxLg='0' />
        </div>

        {/* Down payment */}
        <div className="w-100 px-0 mb-3">
          <CustomInputNumber
            type='text'
            name='advance'
            label='Down payment'
            value={advance}
            setValue={setAdvance}
            optional={true}
            disabled={false}
            pxLg='0' />
        </div>

        {/* Price */}
        <div className="w-100 px-0 mb-3">
          <CustomInputNumber
            type='text'
            name='howMuchPaid'
            label='How much paid'
            value={howMuchPaid}
            setValue={setHowMuchPaid}
            optional={true}
            disabled={false}
            pxLg='0' />
        </div>

        <input type="hidden" name="permission" value={userType} />

        <button
          type="submit"
          className="btn btn-sm w-auto text-custom btn-rounded border-custom btn-shine btn-shine-hover">
          <span className="small font-weight-bold">Add</span>
        </button>
      </form>
    </CustomModal>
  );
}
