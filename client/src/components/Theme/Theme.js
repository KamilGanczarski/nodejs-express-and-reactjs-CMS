import React from 'react'

export default function Theme() {
  const setNewTheme = () => {
    const themeDOM = document.getElementById("theme");
    const classNames = themeDOM.className.split(' ');
    const currentTheme = classNames.find(name => name.includes('theme-'));
    const newTheme = currentTheme === 'theme-dark' ? 'theme-default' : 'theme-dark';
    themeDOM.classList.replace(currentTheme, newTheme);
  }

  return (
    <section>
      <button className="btn" onClick={setNewTheme}>Change theme</button>
    </section>
  )
}
