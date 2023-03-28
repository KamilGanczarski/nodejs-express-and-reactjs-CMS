import React from 'react';

// Utils
import {
  componentModel,
  componentFileModel
} from '../../../../interfaces/interfaces';

// Components
import CustomModal from '../../../CustomElements/Modal/CustomModal';
import AddRemoveComponent from '../../Components/AddRemoveComponent';
import ManageHeroPhotos from './ManageHeroPhotos';
import EditTextSlides from './EditTextSlides';

type Props = {
  component: componentModel;
  files: componentFileModel[];
  fetchHeroComponent: () => void;
}

export default function EditHero({
  component,
  files,
  fetchHeroComponent
}: Props) {
  return (
    <CustomModal title="Hero banner" btnIdName={component.type} size="xl">
      <AddRemoveComponent
        componentName="hero-carousel"
        componentId={component.page_component_id}
        fetchHeroComponent={fetchHeroComponent}
        disabledComponent={component.disabled}
        title="Hero banner">

        <EditTextSlides
          files={files}
          fetchHeroComponent={fetchHeroComponent} />

        <ManageHeroPhotos
          component={component}
          files={component.files} />
      </AddRemoveComponent>
    </CustomModal>
  )
}
