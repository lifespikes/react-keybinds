import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  KeyShortContextType,
  ShortcutType,
  KeyShortProviderPropsI,
  KeyShortContextState,
} from '../types';
import { isDuplicate } from '../utils';
import { useShortcuts } from '../hooks';

export const KeyShortContext = createContext({
  shortcuts: [] as ShortcutType[],
} as KeyShortContextType);

const KeyShortProvider: FC<KeyShortProviderPropsI> = ({
  children,
  shortcuts = [],
}) => {
  const [storeShortcuts, setStoreCommands] = useState(shortcuts);

  const registerCommand = useCallback(
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
      registerCommand,
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
