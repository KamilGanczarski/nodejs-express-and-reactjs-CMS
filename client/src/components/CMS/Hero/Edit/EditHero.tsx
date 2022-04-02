import React from 'react';

// Utils
import {
  componentModel,
  componentContentModel
} from '../../../../utils/interfaces';

// Components
import CustomModal from '../../../CustomElements/Modal/CustomModal';
import AddRemoveComponent from '../../Components/AddRemoveComponent';
import ManagePhotos from './ManagePhotos';
import EditTextSlides from './EditTextSlides';

type Props = {
  pageName: string;
  component: componentModel;
  textSlides: componentContentModel[][] | undefined;
  fetchHeroComponent: () => void;
}

export default function EditHero({
  pageName,
  component,
  textSlides,
  fetchHeroComponent
}: Props) {
  return (
    <CustomModal title="Hero banner" btnIdName={component.type} size="xl">
      <AddRemoveComponent
        pageName={pageName}
        componentName="hero-carousel"
        fetchHeroComponent={fetchHeroComponent}
        disabledComponent={component.disabled}
        title="Hero banner">
        <ManagePhotos />

        <EditTextSlides
          pageName={pageName}
          textSlides={textSlides}
          fetchHeroComponent={fetchHeroComponent} />
      </AddRemoveComponent>

    </CustomModal>
  )
}
