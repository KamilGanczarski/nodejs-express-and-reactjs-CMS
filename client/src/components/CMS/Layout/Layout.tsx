import React from 'react';

// Utils
import { componentModel } from '../../../utils/interfaces';

// Components
import CustomModal from '../../CustomElements/Modal/CustomModal';
import ComponentPosition from './ComponentPosition';
import ModalTitle from '../../CustomElements/Modal/ModalTitle';

type Props = {
  components: componentModel[];
}

export default function Layout({ components }: Props) {
  return (
    <CustomModal title="Layout" btnIdName="layout" size="xl">
      <ModalTitle title="Change order of components" />
      {components.map((component, index) => {
        return (
          <ComponentPosition
            key={index}
            index={index}
            componentType={component.type}
            componentsLength={components.length} />
        )
      })}
    </CustomModal>
  )
}
