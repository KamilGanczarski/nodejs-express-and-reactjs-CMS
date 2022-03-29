import React from 'react';

type Props = {
  name: string;
  description: string;
  checked: boolean;
  changeValue: (name: string, checked: boolean) => any;
  optional: boolean;
  disabled: boolean;
};

export default function CustomSwitch({
  name,
  description,
  checked,
  changeValue,
  optional,
  disabled
}: Props) {
  return (
    <div v-for="Permission in Permissions_view"
      className="w-100 row pb-3 m-0">
      {/* Custom switch */}
      <label className="switch switch-normal w-auto m-0">
        <input
          type="checkbox"
          onChange={(e)=>changeValue(name, e.target.checked)}
          checked={checked} />
        <small></small>
      </label>
      <span className="w-auto ps-3 align-top">{description}</span>
      {/* Optionaly text */}
      {optional &&
        <p className="pt-2 m-0 small">(optionally)</p>
      }
    </div>
  )
}
