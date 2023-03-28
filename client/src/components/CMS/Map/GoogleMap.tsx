import React from 'react'

type Props = {}

export default function GoogleMap({}: Props) {
  return (
    <article className="w-100 px-0">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20352.87478948124!2d17.48414062998267!3d50.383160085818126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711be43f1fb3afb%3A0xf1016e56d5558101!2s48-200%20Mieszkowice!5e0!3m2!1sen!2spl!4v1593172020545!5m2!1sen!2spl"
        style={{height: '500px', border: 0 }}
        className="w-100"
        frameBorder="0">
      </iframe>
    </article>
  )
}