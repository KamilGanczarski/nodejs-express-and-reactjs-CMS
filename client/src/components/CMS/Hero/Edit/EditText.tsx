import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Utils
import { FileContentModel } from '../../../../interfaces/interfaces';
import { baseApiUrl, axiosHeaders } from '../../../../utils/tokenAPI';

// Components
import CustomInput from '../../../CustomElements/CustomInput';
import CustomSelect from '../../../CustomElements/CustomSelect';

// Data
import { slideTextSizes } from './data';

type Props = {
  textObj: FileContentModel;
  fetchHeroComponent: () => void;
}

export default function EditText({ textObj, fetchHeroComponent }: Props) {
  const [text, setText] = useState(textObj.content);
  const [size, setSize] = useState(textObj.text_size);

  const saveChanges = async () => {
    await axios.patch(`${baseApiUrl}/api/v1/content`, {
        contentId: textObj.id,
        name: textObj.name,
        text_size: size,
        content: text
      }, axiosHeaders)
      .then(res => {
        fetchHeroComponent();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteText = async () => {
    await axios.delete(`${baseApiUrl}/api/v1/content`, {
        data: {
          contentId: textObj.id
        }, headers: axiosHeaders.headers 
      })
      .then(res => {
        fetchHeroComponent();
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    setText(textObj.content);
    setSize(textObj.text_size);
  }, [textObj]);

  return (
    <div className="w-100 row mx-0 px-0">
      {/* Slide text */}
      <div className="col-sm-12 col-xl-8 px-0 mb-3 mx-auto">
        <CustomInput
          type='text'
          name={`edit-text-${textObj.id}`}
          label='Text'
          value={text}
          setValue={setText}
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
            onClick={saveChanges}
            className="btn btn-sm text-custom btn-rounded border-custom btn-shine btn-shine-hover">
            <span className="small font-weight-bold">Save</span>
          </button>
        </div>
        <div className="w-auto px-1">
          <button
            onClick={deleteText}
            className="btn btn-sm text-custom btn-circle-custom border-danger btn-shine btn-shine-hover">
            <i className="icon-cancel m-0 text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
