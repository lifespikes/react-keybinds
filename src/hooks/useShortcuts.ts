import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { findShortcut } from '../utils';
import { ShortcutType } from '../types';

export const useShortcuts = (shortcuts: ShortcutType[]) => {
  const [keys, setKeys] = useState<string[]>([]);

  const removeKeys = useDebouncedCallback(() => {
    setKeys([]);
  }, 1000);

  useEffect(() => {
    const shortcut = findShortcut(shortcuts, keys);
    if (shortcut && shortcut.callback) {
      shortcut.callback();
      setKeys([]);
    }
  }, [keys]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      setKeys(oldKeys => [...oldKeys, event.key]);
      removeKeys();
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
};
