import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { BlockLinkModel } from '../../utils/interfaces';
import { baseUrl, axiosHeaders, redirectTo } from '../../utils/tokenAPI';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import BlockLinks from '../../components/Admin/BlockLinks/BlockLinks';

// Data
import { sidebarLinks } from '../../components/Sidebar/data';

type Props = {}

export default function Pages({}: Props) {
  const [ BlockLinksList, setBlockLinksList ] = useState<BlockLinkModel[]>([]);

  const fetchPages = async () => {
    // If token in local storage is set
    if (!localStorage.token) {
      redirectTo('/login');
    }

    await axios.get(`${baseUrl}/api/v1/pages`, axiosHeaders)
      .then(res => {
        const newPages = res.data.pages;
        let newBlockLinks: BlockLinkModel[] = [];

        for (let i = 0; i < newPages.length; i++) {
          let newBlockLink: BlockLinkModel = {
            id: newPages[i].id,
            icon: 'icon-popup',
            label: newPages[i].name,
            link: `/admin/edit-page${newPages[i].url}`,
            type: 'button',
            onclick: () => {}
          };

          newBlockLinks.push(newBlockLink);
        }
        setBlockLinksList(newBlockLinks);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <section className="d-flex Sidebar admin">
      {/* Sidebar */}
      <Sidebar links={sidebarLinks} />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      {/* Sidebar page content wrapper */}
      <main className="main container-fluid px-0">
        <div className="div-under-navbar"></div>
        <h2 className="py-5 mx-0 my-0 text-center">Pages</h2>

        <BlockLinks links={BlockLinksList} />
      </main>
    </section>
  )
}