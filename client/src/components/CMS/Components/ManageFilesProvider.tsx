import { createContext } from 'react';
import { ComponentsContextType } from '../../../utils/interfaces';

const ComponentsContext = createContext<ComponentsContextType>({
  pageName: '',
  componentId: 0
});

export default ComponentsContext;
