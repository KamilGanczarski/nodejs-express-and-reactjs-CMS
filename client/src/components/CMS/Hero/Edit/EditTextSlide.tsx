import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Collapse, Button } from 'react-bootstrap';

// Utils
import { FileContentModel } from '../../../../interfaces/interfaces';
import { baseApiUrl, axiosHeaders } from '../../../../utils/tokenAPI';

// Context
import ComponentsContext from '../../../../providers/ManageFilesProvider';

// Component
import EditText from './EditText';
import CustomInput from '../../../CustomElements/CustomInput';
import CustomSelect from '../../../CustomElements/CustomSelect';

// Data
import { slideTextSizes } from './data';

type Props = {
  textSlide: FileContentModel[] | undefined;
  fileId: number;
  fetchHeroComponent: () => void;
}

export default function EditTextSlide({
  textSlide,
  fileId,
  fetchHeroComponent
}: Props) {
  const Components = useContext(ComponentsContext);

  const [open, setOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [size, setSize] = useState(slideTextSizes[0]);

  const addText = async () => {
    // Check if field is filled
    if (!newText) {
      console.error('No text entered');
      return;
    }

    // Check textSlide
    if (!textSlide) return;

    await axios.post(`${baseApiUrl}/api/v1/content`, {
        page: Components.pageName,
        fileId: fileId,
        name: textSlide[0].name,
        text_size: size,
        content: newText
      }, axiosHeaders)
      .then(res => {
        setNewText('');
        fetchHeroComponent();
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (!textSlide) {
    return (<></>);
  }

  return (
    <div className="col-12 px-3 pb-3 mx-auto">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`edit-text-slide-collapse-${textSlide[0].id}`}
        aria-expanded={open}
        className="w-100 ps-4 pe-0 d-flex align-items-center bg-transparent text-hover-theme rounded-0 border-0 border-bottom border-theme collapsed right-rotate">
        <span className="fw-bold">{textSlide[0].name}</span>
        <i className="icon-right-open text-h5 m-0 collapse-icon-rotate ms-auto me-3"></i>
      </Button>
      <Collapse in={open}>
        <div id={`edit-text-slide-collapse-${textSlide[0].id}`}>
          <div className="w-100 row p-3 pt-4 m-0">
            {textSlide.map((textObj, index) => {
              // If init create new text container
              if (textObj.name === 'slide-new') {
                return '';
              }

              return (
                <EditText
                  key={index}
                  textObj={textObj}
                  fetchHeroComponent={fetchHeroComponent} />
              )
            })}
            
            {/* Slide text */}
            <div className="col-sm-12 col-xl-8 px-0 mb-3 mx-auto">
              <CustomInput
                type='text'
                name='new-text'
                label='New'
                value={newText}
                setValue={setNewText}
                optional={false}
                disabled={false}
                pxLg='4' />
            </div>
            
            <div className="col-sm-12 col-xl-4 row px-0 mx-auto justify-content-around align-items-center">
              <div className="w-auto px-1">
                <CustomSelect
                  textArr={slideTextSizes}
                  selectedText={size}
                  setSelectedText={setSize} />
              </div>
              <div className="w-auto px-1">
                <button
                  onClick={addText}
                  className="btn btn-sm text-custom btn-circle-custom border-cutom btn-shine btn-shine-hover">
                  <i className="icon-plus m-0 text-cutom"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  )
}
