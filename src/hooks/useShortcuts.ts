import {useEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {findShortcut, hasItems} from '../utils';
import { ShortcutType} from '../types';

export const useShortcuts = (shortcuts: ShortcutType[], debounce?: number) => {
  const [keys, setKeys] = useState<string[]>([]);

  const removeKeys = useDebouncedCallback(() => {
    setKeys([]);
  }, debounce ?? 1000);

  useEffect(() => {
    if (hasItems(keys) && hasItems(shortcuts)) {
      const shortcut = findShortcut(shortcuts, keys);
      if (shortcut && shortcut.callback) {
        shortcut.callback();
        setKeys([]);
      }
    }
  }, [keys, shortcuts]);

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
