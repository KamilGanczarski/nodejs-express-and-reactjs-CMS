import React, { useState } from 'react'

export default function Theme() {
  const [theme, setTheme] = useState([])

  const setNewTheme = () => {
    const newTheme = theme === 'dark' ? '' : 'dark';
    document.getElementById("theme").setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <section>
      <button className="btn" onClick={setNewTheme}>Change theme</button>
    </section>
  )
}
