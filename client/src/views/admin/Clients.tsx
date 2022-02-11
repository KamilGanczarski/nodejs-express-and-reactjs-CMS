import React from 'react';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import UsersTable from '../../components/Admin/UsersTable/UsersTable';

type Props = {};

export default function Clients({}: Props) {
  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar admin */}
      <Sidebar />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Clients</h2>

        <UsersTable userType='client' />
      </main>
    </section>
  );
}
