import React from 'react'

import AdminSidebar from '../../components/Sidebar/Sidebar'
import UserTable from '../../components/Admin/UserTable/UserTable'

export default function Clients() {
  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar admin */}
      <AdminSidebar />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Clients</h2>

        <UserTable userType='client' />
      </main>
    </section>
  )
}
