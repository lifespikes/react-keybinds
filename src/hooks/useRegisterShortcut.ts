import { useEffect } from 'react';
import { useKeyBind } from './useKeyBind';
import { ShortcutType } from '../types';

export const useRegisterShortcut = (shortcut: ShortcutType) => {
  const { registerShortcut } = useKeyBind();

  useEffect(() => {
    registerShortcut(shortcut);
  }, []);
};
