import React from 'react';

// Components
import CustomFileInput from '../../../CustomElements/CustomFileInput';

type Props = {}

export default function ManageHeroPhotos({}: Props) {
  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h6 className="col-12 px-2 pt-3 pb-2 mx-auto">
        <span className="fw-bold">Manage photos</span>
      </h6>
      <div className="col-sm-12 col-lg-10 col-lg-8 py-3 mx-auto">
        <CustomFileInput
          title="Choose files"
          description="or move files here"
          name="carousel-input-background"
          accept=".jpg,.jpeg,.png"
          multiple={true} />
      </div>
    </section>
  )
}
