import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { componentContentModel } from '../../../../utils/interfaces';
import { baseUrl, axiosHeaders } from '../../../../utils/tokenAPI';

// Components
import CustomInput from '../../../CustomElements/CustomInput';
import CustomSelect from '../../../CustomElements/CustomSelect';

// Data
import { slideTextSizes } from './data';

type Props = {
  textObj: componentContentModel;
  fetchPages: () => void;
}

export default function EditText({ textObj, fetchPages }: Props) {
  const [text, setText] = useState(textObj.content);
  const [size, setSize] = useState(textObj.description);

  const saveChanges = async () => {
    await axios.patch(`${baseUrl}/api/v1/content`, {
        contentId: textObj.id,
        name: textObj.name,
        description: size,
        content: text
      }, axiosHeaders)
      .then(res => {
        fetchPages();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteText = async () => {
    await axios.delete(`${baseUrl}/api/v1/content`, {
        data: {
          contentId: textObj.id
        }, headers: axiosHeaders.headers 
      })
      .then(res => {
        fetchPages();
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    setText(textObj.content);
    setSize(textObj.description);
  }, [textObj]);

  return (
    <div className="w-100 row mx-0">
      {/* Slide text */}
      <div className="col-sm-12 col-xl-8 px-0 mb-3 mx-auto">
        <CustomInput
          type='text'
          name='edit-text'
          label='Text'
          value={text}
          setValue={setText}
          optional={false}
          disabled={false}
          pxLg='4' />
      </div>

      <div className="col-sm-12 col-xl-4 row px-0 mb-4 mx-auto justify-content-around align-items-center">
          <div className="col-4">
            <CustomSelect
              textArr={slideTextSizes}
              selectedText={size}
              setSelectedText={setSize} />
          </div>
          <div className="col-3">
            <button
              onClick={saveChanges}
              className="btn btn-sm w-auto px-4 py-1 mx-auto text-custom btn-rounded-light btn-shine btn-shine-animation">
              <span className="small text-uppercase font-weight-bold">Save</span>
            </button>
          </div>
          <div className="col-2">
            <button
              onClick={deleteText}
              className="btn btn-sm w-auto py-1 mx-auto text-custom btn-rounded-danger btn-shine btn-shine-animation">
              <i className="icon-cancel m-0 text-danger"></i>
            </button>
          </div>
      </div>
    </div>
  )
}
