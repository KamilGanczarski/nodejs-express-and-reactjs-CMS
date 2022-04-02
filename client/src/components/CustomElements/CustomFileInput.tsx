import React from 'react';

type Props = {
  title: string;
  description: string;
  name: string;
  accept: string;
  multiple: boolean;
}

export default function CustomFileInput({
  title,
  description,
  name,
  accept,
  multiple
}: Props) {
  return (
    <div className="w-100 py-4 mx-auto rounded file-drop-area">
      <span className="fake-btn">{title}</span>
      <span className="col text-end file-msg">{description}</span>
      <input
        type="file"
        accept={accept}
        name={name}
        multiple={multiple}
        className="w-100 mb-5 file-input" />
    </div>
  )
}