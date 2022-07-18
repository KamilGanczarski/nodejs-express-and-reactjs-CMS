import React from 'react';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import UsersTable from '../../components/Admin/UsersTable/UsersTable';

// Data
import { sidebarLinks } from '../../components/Sidebar/data';

type Props = {};

export default function Calendar({}: Props) {
  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar */}
      <Sidebar links={sidebarLinks} />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-toggle-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Calendar</h2>

        <UsersTable userType='event' />
      </main>
    </section>
  )
}
