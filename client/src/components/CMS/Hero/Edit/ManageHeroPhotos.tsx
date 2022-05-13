import React, { useContext } from 'react';
import axios from 'axios';

// Utils
import {
  componentModel,
  componentFileModel
} from '../../../../utils/interfaces';
import { baseUrl, axiosHeadersImage } from '../../../../utils/tokenAPI';

// Context
import ComponentsContext from '../../Components/ManageFilesProvider';

// Components
import CustomFileInput from '../../../CustomElements/CustomFileInput';
import EditPhoto from './EditPhoto';

type Props = {
  component: componentModel;
  files: componentFileModel[];
}

export default function ManageHeroPhotos({ component, files }: Props) {
  const Components = useContext(ComponentsContext);

  const uploadPhoto = async (fileStatus: string, domName: string) => {
    let formData = new FormData();
    const domFilesInput = document.getElementsByName(domName)[0] as HTMLInputElement;
    const files = domFilesInput.files;

    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    formData.append("image", files[0]);

    await axios.post(
        `${baseUrl}/api/v1/file?page=${Components.pageName}&componentId=${component.id}&fileStatus=${fileStatus}`,
        formData,
        axiosHeadersImage
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(`ERROR: ${error.response.data.msg}`);
      });
  }

  return (
    <section className="w-100 row pb-2 mx-0 mb-4">
      <h6 className="col-12 px-2 pt-3 pb-2 mx-auto">
        <span className="fw-bold">Manage photos</span>
      </h6>
      <div className="col-sm-12 col-lg-10 col-xl-8 py-3 mx-auto">
        <CustomFileInput
          title="Choose files"
          description="or move files here"
          name="carousel-input-files"
          accept=".jpg,.jpeg,.png"
          multiple={true} />

        <div className="w-100 py-4 text-center">
          <button
            onClick={()=>uploadPhoto('show', 'carousel-input-files')}
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
