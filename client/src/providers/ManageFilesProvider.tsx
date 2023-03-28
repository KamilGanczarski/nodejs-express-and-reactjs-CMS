import { createContext } from 'react';
import { ComponentsContextType } from '../interfaces/interfaces';

const ComponentsContext = createContext<ComponentsContextType>({
  pageName: '',
  componentId: 0
});

export default ComponentsContext;
