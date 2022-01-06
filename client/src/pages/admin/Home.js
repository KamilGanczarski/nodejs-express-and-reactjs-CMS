import React from 'react'

import AdminSidebar from '../../components/Sidebar/Sidebar'

export default function Home() {
  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar admin */}
      <AdminSidebar />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="pt-5 pb-3 mx-0 my-0 text-center">Admin home</h2>
        
      </main>
    </section>
  )
}
