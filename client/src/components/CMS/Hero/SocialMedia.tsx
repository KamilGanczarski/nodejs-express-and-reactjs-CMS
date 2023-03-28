import React from 'react'

// Components
import SocialMediaIcon from './SocialMediaIcon'

type Props = {}

export default function SocialMedia({}: Props) {
  return (
    <div className="d-flex align-items-end social-absolute">
      <div className="d-flex flex-column bottom-hero-item">
        {/* Facebook */}
        <SocialMediaIcon url="#link-facebook" icon="icon-facebook" />

        {/* Instagram */}
        <SocialMediaIcon url="#link-instagram" icon="icon-instagram" />

        {/* YouTube */}
        <SocialMediaIcon url="#link-youtube" icon="icon-youtube" />

        {/* Twitter */}
        <SocialMediaIcon url="#link-twitter" icon="icon-twitter" />
      </div>
    </div>
  )
}
