import React from 'react';

export interface KeyShortProviderPropsI {
  children?: React.ReactNode;
  shortcuts?: ShortcutType[];
}

export type ShortcutType = {
  keys: string[];
  label: string;
  callback?: () => void;
};

export type KeyShortContextType = {
  registerShortcut?: (shortcut: ShortcutType) => void;
};

export type KeyShortContextState = KeyShortProviderPropsI & KeyShortContextType;
