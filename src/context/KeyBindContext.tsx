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
import { findFirstPlatformMatch, isDuplicate } from '../utils';
import { useShortcuts } from '../hooks';

export const KeyBindContext = createContext({} as KeyBindContextState);

const KeyBindProvider: FC<KeyBindProviderPropsI> = ({
  children,
  shortcuts = [],
}) => {
  const [storeShortcuts, setStoreCommands] = useState(shortcuts);

  const registerShortcut = useCallback(
    (command: ShortcutType) => {
      if (isDuplicate(storeShortcuts, command)) {
        console.warn('Command already registered', { storeShortcuts, command });
        return;
      }
      setStoreCommands(prev => [...prev, command]);
    },
    [storeShortcuts]
  );

  const getKeysByPlatform = useCallback(
    (command: ShortcutType) => {
      return findFirstPlatformMatch(command.keys);
    },
    [storeShortcuts]
  );

  useShortcuts(storeShortcuts);

  const commandsContext = useMemo<KeyBindContextState>(
    () => ({
      shortcuts: storeShortcuts,
      registerShortcut,
      getKeysByPlatform,
    }),
    [storeShortcuts]
  );
  return (
    <KeyBindContext.Provider value={commandsContext}>
      {children}
    </KeyBindContext.Provider>
  );
};

export default KeyBindProvider;
