import React from 'react';

// Utils
import { componentModel } from '../../../interfaces/interfaces';

// Components
import CustomModal from '../../CustomElements/Modal/CustomModal';
import ComponentPosition from './ComponentPosition';
import ModalTitle from '../../CustomElements/Modal/ModalTitle';

type Props = {
  components: componentModel[];
  pageName: string;
  fetchComponents: () => void;
}

export default function Layout({ components, pageName, fetchComponents }: Props) {
  return (
    <CustomModal title="Layout" btnIdName="layout" size="xl">
      <ModalTitle title="Change order of components" />
      {components.map((component, index) => {
        return (
          <ComponentPosition
            key={index}
            pageName={pageName}
            fetchComponents={fetchComponents}
            index={index}
            components={components}
            componentsLength={components.length} />
        )
      })}
    </CustomModal>
  )
}
