import React from 'react';

type Props = {};

export default function Theme({}: Props) {
  const setNewTheme = () => {
    const themeDOM = document.getElementById("theme")!;
    const classNames: string[] = themeDOM.className.split(' ');
    const currentTheme: string = classNames.find(name => name.includes('theme-'))!;
    const newTheme: string = currentTheme === 'theme-dark' ? 'theme-default' : 'theme-dark';
    themeDOM.classList.replace(currentTheme, newTheme);
  }

  return (
    <section>
      <button className="btn" onClick={()=>setNewTheme}>Change theme</button>
    </section>
  );
}
