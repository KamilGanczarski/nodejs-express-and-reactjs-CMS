import React from 'react';

// Utils
import {
  componentFileModel
} from '../../../../utils/interfaces';

// Components
import CustomFileInput from '../../../CustomElements/CustomFileInput';
import EditPhoto from './EditPhoto';

type Props = {
  files: componentFileModel[];
}

export default function ManageHeroPhotos({ files }: Props) {
  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h6 className="col-12 px-2 pt-3 pb-2 mx-auto">
        <span className="fw-bold">Manage photos</span>
      </h6>
      <div className="col-sm-12 col-lg-10 col-xl-8 py-3 mx-auto">
        <CustomFileInput
          title="Choose files"
          description="or move files here"
          name="carousel-input-background"
          accept=".jpg,.jpeg,.png"
          multiple={true} />
          
        <div className="w-100 py-4 text-center">
          <button
            className="btn btn-sm text-custom btn-rounded border-custom btn-shine btn-shine-hover">
            <span className="small font-weight-bold">Add files</span>
          </button>
        </div>
      </div>

      <div className="px-4">
        {files.map((file, index) => {
          return (
            <EditPhoto
              key={index}
              file={file}
              filesCount={files.length}
              index={index} />
          )
        })}
      </div>
    </section>
  )
}
