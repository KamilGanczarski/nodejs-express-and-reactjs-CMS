import React from 'react';

type Props = {
  url: string;
  icon: string;
}

export default function SocialMediaIcon({ url, icon }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      className="btn btn-sm text-hover-light">
      <i className={`text-h5 ${icon}`}></i>
    </a>
  )
}
