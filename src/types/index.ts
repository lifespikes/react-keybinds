import React from 'react';
import { PlatformType } from './platform.type';

export interface KeyShortProviderPropsI {
  children?: React.ReactNode;
  shortcuts?: ShortcutType[];
}

export type KeysType = {
  [key in PlatformType]?: string[];
};

export type ShortcutType = {
  keys: KeysType;
  label: string;
  callback?: () => void;
};

export type KeyShortContextType = {
  registerShortcut?: (shortcut: ShortcutType) => void;
};

export type KeyShortContextState = KeyShortProviderPropsI & KeyShortContextType;
