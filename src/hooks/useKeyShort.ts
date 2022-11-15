import { useContext } from 'react';
import { KeyShortContext } from '../context/KeyShortContext';

export const useKeyShort = () => {
  const keyShortContext = useContext(KeyShortContext);

  if (!keyShortContext) {
    throw new Error('useKeyShort hook must be used with KeyShortProvider');
  }

  return keyShortContext;
};
