import React from 'react'

// Utils
import {
  componentFileModel
} from '../../../../utils/interfaces';

type Props = {
  file: componentFileModel;
  filesCount: number;
  index: number;
}

export default function EditPhoto({ file, filesCount, index }: Props) {
  return (
    <div className="w-100 row p-0 pt-4 m-0">
      <div className="d-flex col-sm-5 col-md px-0 pt-3 pb-3 pb-md-0">
        <img
          src={file.path}
          alt={file.filename}
          className="d-block w-100 h-auto" />
      </div>
      <button
        className="btn w-auto col align-self-center text-start text-theme-1">
        {file.filename}
      </button>
      <div
        className="d-flex align-items-start flex-column w-auto px-1 text-end">
        {filesCount > 1 && index == 0 &&
          <button
            // v-on:click="swap_photos(i, (i + 1))"
            className="btn btn-sm p-2 text-middle btn-circle-custom border-theme btn-shine btn-shine-hover">
            <i className="icon-down-open m-0 text-theme"></i>
          </button>
        }

        {index > 0 && index < filesCount - 1 &&
          <button
            // v-on:click="swap_photos(i, (i - 1))"
            className="btn btn-sm p-2 mt-auto mb-2 btn-circle-custom border-theme btn-shine btn-shine-hover">
            <i className="icon-up-open m-0 text-theme"></i>
          </button>
        }
        {index > 0 && index < filesCount - 1 &&
          <button 
            // v-on:click="swap_photos(i, (i + 1))"
            className="btn btn-sm p-2 mt-2 mb-auto btn-circle-custom border-theme btn-shine btn-shine-hover">
            <i className="icon-down-open m-0 text-theme"></i>
          </button>
        }

        {filesCount > 1 && index == filesCount - 1 &&
          <button
            // v-on:click="swap_photos(i, (i - 1))"
            className="btn btn-sm p-2 text-middle btn-circle-custom border-theme btn-shine btn-shine-hover">
            <i className="icon-up-open m-0 text-theme"></i>
          </button>
        }
      </div>
      <button
        // v-on:click="delete_photo(photo.id)"
        className="btn btn-sm w-auto d-flex align-self-center p-2 m-0 ms-3 btn-circle-custom border-danger btn-shine btn-shine-hover">
        <i className="icon-cancel m-0 text-danger"></i>
      </button>
    </div>
  )
}
