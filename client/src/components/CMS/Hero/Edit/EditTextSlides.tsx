import React, { useState } from 'react';

// Utils
import { componentFileModel, FileContentModel } from '../../../../interfaces/interfaces';

// Components
import EditTextSlide from './EditTextSlide';

type Props = {
  files: componentFileModel[];
  fetchHeroComponent: () => void;
}

export default function EditTextSlidess({
  files,
  fetchHeroComponent
}: Props) {
  // const [newTextSlides, setNewTextSlides] = useState<FileContentModel[]>();

  // const addNewTextContainer = () => {
  //   let tempTextSlides: FileContentModel[] = [];
  //   tempTextSlides.push({
  //     id: 0,
  //     name: `slide-${files[0].file_content?.length}`,
  //     description: '',
  //     content: '',
  //     text_size: '',
  //     order_id: 0,
  //     file_info_id: 0
  //   });
  //   setNewTextSlides(tempTextSlides);
  // }

  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h6 className="col-12 px-2 pt-3 pb-2 mx-auto">
        <span className="fw-bold">Additional information</span>
      </h6>
      {files.map((file, index) => {
        return (
          <EditTextSlide
            key={index}
            textSlide={file.file_content}
            fileId={file.id}
            fetchHeroComponent={fetchHeroComponent} />
        )
      })}

      {/* <EditTextSlide
        textSlide={newTextSlides}
        fetchHeroComponent={fetchHeroComponent} /> */}

      {/* <div className="text-center pt-3">
        <button
          onClick={addNewTextContainer}
          className="btn btn-sm px-4 text-custom btn-circle-custom border-cutom btn-shine btn-shine-hover">
          Add new text container
          <i className="icon-plus m-0 text-cutom"></i>
        </button>
      </div> */}
    </section>
  )
}
