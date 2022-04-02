import React from 'react';

type Props = {
  name: string;
  checked: boolean;
  changeValue: (name: string, checked: boolean) => any;
  disabled: boolean;
};

export default function CustomSwitch({
  name,
  checked,
  changeValue,
  disabled
}: Props) {
  return (
    <label className="switch switch-normal w-auto m-0">
      <input
        type="checkbox"
        onChange={(e)=>changeValue(name, e.target.checked)}
        checked={checked} />
      <small></small>
    </label>
  )
}
