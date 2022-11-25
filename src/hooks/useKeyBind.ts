import { useContext } from 'react';
import { KeyBindContext } from '../context/KeyBindContext';
import { KeyBindContextState } from '../types';

export const useKeyBind = (): KeyBindContextState => {
  const keyBindContext = useContext(KeyBindContext);

  if (!keyBindContext || Object.values(keyBindContext ?? {}).length === 0) {
    throw new Error('useKeyBind hook must be used with KeyBindProvider');
  }

  return keyBindContext;
};
