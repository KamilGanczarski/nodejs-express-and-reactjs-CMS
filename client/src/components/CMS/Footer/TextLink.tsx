import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  url: string;
  text: string;
}

export default function TextLink({ url, text }: Props) {
  return (
    <Link
      to={url}
      className="btn btn-sm w-auto px-1 mx-1 text-with-underline">
      <span>{text}</span>
      <div></div>
    </Link>
  )
}