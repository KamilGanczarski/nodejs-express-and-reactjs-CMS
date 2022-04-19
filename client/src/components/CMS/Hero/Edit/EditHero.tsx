import React from 'react';

// Utils
import {
  componentModel,
  componentContentModel
} from '../../../../utils/interfaces';

// Components
import CustomModal from '../../../CustomElements/Modal/CustomModal';
import AddRemoveComponent from '../../Components/AddRemoveComponent';
import ManageHeroPhotos from './ManageHeroPhotos';
import EditTextSlides from './EditTextSlides';

type Props = {
  component: componentModel;
  textSlides: componentContentModel[][] | undefined;
  fetchHeroComponent: () => void;
}

export default function EditHero({
  component,
  textSlides,
  fetchHeroComponent
}: Props) {
  return (
    <CustomModal title="Hero banner" btnIdName={component.type} size="xl">
      <AddRemoveComponent
        componentName="hero-carousel"
        fetchHeroComponent={fetchHeroComponent}
        disabledComponent={component.disabled}
        title="Hero banner">

        <ManageHeroPhotos />

        <EditTextSlides
          textSlides={textSlides}
          fetchHeroComponent={fetchHeroComponent} />
      </AddRemoveComponent>

    </CustomModal>
  )
}
