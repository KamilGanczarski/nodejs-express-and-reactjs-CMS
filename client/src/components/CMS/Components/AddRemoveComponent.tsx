import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Accordion } from 'react-bootstrap';

// Utils
import { baseUrl, axiosHeaders } from '../../../utils/tokenAPI';

// Context
import ComponentsContext from './ManageFilesProvider';

// Components
import CustomSwitch from '../../CustomElements/CustomSwitch';

type Props = {
  componentName: string;
  disabledComponent: boolean;
  fetchHeroComponent: () => void;
  title: string;
  children: React.ReactNode;
}

export default function AddRemoveComponent({
  componentName,
  disabledComponent,
  fetchHeroComponent,
  title,
  children
}: Props) {
  const Components = useContext(ComponentsContext);

  const [checked, setChecked] = useState(false);

  const changeComponentBool = (name: string, checked: boolean) => {
    addRemoveComponent();
  }

  const addRemoveComponent = async () => {
    await axios.post(`${baseUrl}/api/v1/components`, {
      page: Components.pageName,
      componentName
    }, axiosHeaders)
    .then((response) => {
      if (response.data.length > 0) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      fetchHeroComponent();
    })
    .catch(error => {
      setChecked(false);
      fetchHeroComponent();
      if (error.response.data.msg) {
        console.log(error.response.data.msg);
      }
    })
  }

  useEffect(() => {
    setChecked(!disabledComponent);
  }, [disabledComponent]);

  return (
    <div className="w-100 row p-0 m-0">
      <Accordion activeKey={checked ? "0" : "-1"} flush className="px-0 bg-transparent">
        <Accordion.Item
          eventKey="0"
          className="bg-transparent px-0 mb-4">
          <Accordion.Header onClick={()=>addRemoveComponent()}>
            <h5 className="col-5 px-0 pb-3 pb-lg-0 m-0">
              <span className="fw-bold text-theme">{title}</span>
            </h5>
            <div className="col-7 px-0 m-0 text-end">
              <CustomSwitch
                name={componentName}
                checked={checked}
                changeValue={changeComponentBool}
                disabled={false} />
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {children}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
