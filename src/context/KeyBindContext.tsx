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
import { isDuplicate } from '../utils';
import { useShortcuts } from '../hooks';

export const KeyBindContext = createContext({
  shortcuts: [] as ShortcutType[],
  registerShortcut: (shortcut: ShortcutType) => {
    console.log('Not implemented', { shortcut });
  },
} as KeyBindContextState);

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

  useShortcuts(storeShortcuts);

  const commandsContext = useMemo<KeyBindContextState>(
    () => ({
      shortcuts: storeShortcuts,
      registerShortcut,
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
