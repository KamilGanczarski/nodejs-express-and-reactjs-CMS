import React from 'react'

export default function Home() {
  return (
    <section className="w-100 py-5 my-5 text-center">
      <p>Admin home</p>
      <a href="/api/v1/logout" className="btn btn-sm btn-light">Log out</a>
    </section>
  )
}
