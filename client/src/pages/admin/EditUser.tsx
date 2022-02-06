import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import EditUserForm from '../../components/Admin/EditUserForm/EditUserForm'

interface EditUserParams {
  userId: string;
}

type Props = {};

export default function EditUser({}: Props) {
  const { userId } = useParams<EditUserParams>();

  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar admin */}
      <Sidebar />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Edit user</h2>

        <EditUserForm newUserId={userId} />
      </main>
    </section>
  );
}
