import React, { useState, useEffect } from 'react';

type Props = {
  type: string;
  name: string;
  label: string;
  value: number;
  setValue: (value: number) => any;
  optional: boolean;
  disabled: boolean;
  pxLg: string;
};

export default function CustomInputNumber({
  type,
  name,
  label,
  value,
  setValue,
  optional,
  disabled,
  pxLg
}: Props) {
  const [ stringValue, setStringValue ] = useState<string>('');
  const [ error, setError ] = useState(false);

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    setStringValue(input);
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      setValue(parseInt(input));
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div className={`form-group form-group-custom w-100 px-0 px-lg-${pxLg} mb-2`}>
      {/* Input */}
      <input
        type={type}
        name={name}
        id={name}
        placeholder=" "
        required={!optional}
        className={`form-control-custom w-100 px-3 py-4 mt-3 ${error ? 'text-danger' : 'text-theme'}`}
        value={stringValue}
        onChange={(e)=>{type === 'number' ? handleNumber(e) : setValue(parseInt(e.target.value))}}
        disabled={disabled} />

      {/* Label */}
      <label
        htmlFor={name}
        className={`form-label-custom ps-3 ps-xl-${pxLg} ms-xl-3`}>
        {label}
      </label>
      {/* Optionaly text */}
      {optional &&
        <p className="pt-2 m-0 small">(optionally)</p>
      }
      {error &&
        <p className="pt-2 m-0 small text-danger">(This isn't number)</p>
      }
    </div>
  )
}
