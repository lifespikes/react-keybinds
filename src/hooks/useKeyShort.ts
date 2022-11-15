import { useContext } from 'react';
import { KeyShortContext } from '../context/KeyShortContext';
import { KeyShortContextState } from '../types';

export const useKeyShort = (): KeyShortContextState => {
  const keyShortContext = useContext(KeyShortContext);

  if (!keyShortContext) {
    throw new Error('useKeyShort hook must be used with KeyShortProvider');
  }

  return keyShortContext;
};
