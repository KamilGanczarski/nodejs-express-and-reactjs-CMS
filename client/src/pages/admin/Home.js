import React, { useEffect, useState } from 'react';

import AdminSidebar from '../../components/Sidebar/Sidebar';
import BlockLinks from '../../components/Admin/BlockLinks/BlockLinks';
import { links } from '../../components/Admin/BlockLinks/home-data.js';

export default function Home() {
  const [buttons, setButtons] = useState([])

  const deployLinks = () => {
    setButtons(links)
  }

  useEffect(() => {
    deployLinks();
  }, [])

  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar admin */}
      <AdminSidebar />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Admin home</h2>
        
        <BlockLinks links={buttons}/>
      </main>
    </section>
  )
}
