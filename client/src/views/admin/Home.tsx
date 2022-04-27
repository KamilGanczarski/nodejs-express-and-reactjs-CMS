import React, { useEffect, useState } from 'react';

// Utils
import { LinkModel } from '../../utils/interfaces';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import BlockLinks from '../../components/Admin/BlockLinks/BlockLinks';

// Data
import { sidebarLinks } from '../../components/Sidebar/data';

type Props = {};

export default function Home({}: Props) {
  const [buttons, setButtons] = useState<LinkModel[]>([])

  const deployLinks = () => {
    setButtons(sidebarLinks)
  }

  useEffect(() => {
    deployLinks();
  }, [])
  
  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar */}
      <Sidebar links={sidebarLinks} />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Admin home</h2>

        <BlockLinks links={buttons} />
      </main>
    </section>
  );
}
