import React from 'react'

type Props = {
  type: string;
  name: string;
  label: string;
  value: string;
  setValue: (value: string) => any;
  optional: boolean;
  disabled: boolean;
  pxLg: string;
}

export default function CustomInput({
  type,
  name,
  label,
  value,
  setValue,
  optional,
  disabled,
  pxLg
}: Props) {
  return (
    <div className={`form-group form-group-custom w-100 px-0 px-lg-${pxLg} mb-2`}>
      {/* Input */}
      <input
        type={type}
        name={name}
        id={name}
        placeholder=" "
        required={!optional}
        className="form-control-custom w-100 px-3 py-4 mt-3 text-theme"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
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
    </div>
  )
}
