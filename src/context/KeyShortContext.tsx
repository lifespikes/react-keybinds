import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  KeyShortContextState,
  KeyShortProviderPropsI,
  ShortcutType,
} from '../types';
import { isDuplicate } from '../utils';
import { useShortcuts } from '../hooks';

export const KeyShortContext = createContext({
  shortcuts: [] as ShortcutType[],
  registerShortcut: (shortcut: ShortcutType) => {
    console.log('Not implemented', { shortcut });
  },
} as KeyShortContextState);

const KeyShortProvider: FC<KeyShortProviderPropsI> = ({
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

  const commandsContext = useMemo<KeyShortContextState>(
    () => ({
      shortcuts: storeShortcuts,
      registerShortcut,
    }),
    [storeShortcuts]
  );
  return (
    <KeyShortContext.Provider value={commandsContext}>
      {children}
    </KeyShortContext.Provider>
  );
};

export default KeyShortProvider;
