import React from 'react'

import Theme from '../components/Theme/Theme'

export default function Home() {
  return (
    <div className="bg-theme text-theme">
      <div className="w-100 py-5 bg-warning">Home</div>
      <div className="w-100 py-5 bg-dark">Home</div>
      <div className="w-100 py-5 bg-warning">Home</div>
      <div className="w-100 py-5 bg-dark">Home</div>
      <div className="w-100 py-5 bg-warning">Home</div>
      <div className="w-100 py-5 bg-dark">Home</div>
      <div className="w-100 py-5 bg-warning">Home</div>
      <div className="w-100 py-5 bg-dark">Home</div>
      <Theme />
    </div>
  )
}
