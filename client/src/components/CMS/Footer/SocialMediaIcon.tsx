import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  url: string;
  style: string;
  icon: string;
}

export default function SocialMediaIcon({ url, style, icon }: Props) {
  return (
    <Link
      to={url}
      target="_blank"
      className={`btn w-auto px-2 py-1 mx-2 rounded btn-shine btn-shine-hover ${style}`}>
      <i className={`h4 m-0 ${icon}`}></i>
    </Link>
  )
}