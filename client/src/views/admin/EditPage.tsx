import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Utils
import { baseUrl, axiosHeaders, redirectTo } from '../../utils/tokenAPI';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import CMS from '../../components/CMS/CMS';

// Data
import { sidebarCmsLinks } from '../../components/Sidebar/data';

interface EditPageParams {
  url: string;
}

type Props = {}

export default function EditPage({}: Props) {
  const { url } = useParams<EditPageParams>();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    setPageName(`/${url}`);
  }, []);

  return (
    <section className="d-flex Sidebar fixed-left wrapper">
      {/* Sidebar */}
      <Sidebar links={sidebarCmsLinks} />
      <div className="sidebar-wrapper-under"></div>
      <div className="sidebar-wrapper-under-shadow btn-hide-sidebar"></div>

      <main className="main container-fluid px-0">
        {pageName &&
          <CMS pageName={pageName} />
        }
      </main>
    </section>
  )
}
