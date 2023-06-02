import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  KeyBindContextState,
  KeyBindProviderPropsI,
  ShortcutType,
} from '../types';
import {
  findFirstPlatformMatch,
  findShortcutIndex,
  getShortcutKeys,
  getShortcutWithDefaultValues,
} from '../utils';
import { useShortcuts } from '../hooks/useShortcuts';

export const KeyBindContext = createContext({} as KeyBindContextState);

const KeyBindProvider: FC<KeyBindProviderPropsI> = ({
  children,
  shortcuts = [],
  debounce,
  // debug = false,
}) => {
  const [storeShortcuts, setStoreCommands] = useState(
    shortcuts.map(shr => getShortcutWithDefaultValues(shr))
  );
  const registerShortcut = useCallback(
    (shortcut: ShortcutType) => {
      setStoreCommands(prevShortcuts => {
        const idx = findShortcutIndex(shortcuts, getShortcutKeys(shortcut));

        const newShortcuts = [...prevShortcuts];

        if (idx > -1) {
          newShortcuts[idx] = getShortcutWithDefaultValues(shortcut);
          return prevShortcuts;
        }

        return [...prevShortcuts, getShortcutWithDefaultValues(shortcut)];
      });
    },
    [storeShortcuts]
  );

  const getKeysByPlatform = useCallback(
    (command: ShortcutType) => {
      return findFirstPlatformMatch(command.keys);
    },
    [storeShortcuts]
  );

  useShortcuts(storeShortcuts, debounce);

  const commandsContext = useMemo<KeyBindContextState>(
    () => ({
      shortcuts: storeShortcuts,
      registerShortcut,
      getKeysByPlatform,
    }),
    [storeShortcuts, registerShortcut, getKeysByPlatform]
  );
  return (
    <KeyBindContext.Provider value={commandsContext}>
      {children}
    </KeyBindContext.Provider>
  );
};

export default KeyBindProvider;
