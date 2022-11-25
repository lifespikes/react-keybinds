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
import { findFirstPlatformMatch, isDuplicate, logMsg } from '../utils';
import { useShortcuts } from '../hooks';

export const KeyBindContext = createContext({} as KeyBindContextState);

const KeyBindProvider: FC<KeyBindProviderPropsI> = ({
  children,
  shortcuts = [],
}) => {
  const [storeShortcuts, setStoreCommands] = useState(shortcuts);

  const registerShortcut = useCallback(
    (shortcut: ShortcutType) => {
      setStoreCommands(prev => {
        return [
          ...(prev?.filter(s => {
            const isDuplicated = isDuplicate(prev, s);
            if (isDuplicated) {
              console.warn(logMsg(s, shortcut));
            }
            return !isDuplicated;
          }) ?? []),
          shortcut,
        ];
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
