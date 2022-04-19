import { createContext } from 'react';
import { ComponentsContextType } from '../../../utils/interfaces';

const ComponentsContext = createContext<ComponentsContextType>({
  pageName: ''
});

export default ComponentsContext;
