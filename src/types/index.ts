import React from 'react';
import { PlatformType } from './platform.type';

export interface KeyBindProviderPropsI {
  children?: React.ReactNode;
  shortcuts?: ShortcutType[];
  debug?: boolean;
  debounce?: number;
}

export type KeysType = {
  [key in PlatformType]?: string[];
};

export type ShortcutType = {
  keys: KeysType;
  _defaultKeys?: KeysType;
  label: string;
  callback?: () => void;
};

export type KeyBindContextType = {
  registerShortcut: (shortcut: ShortcutType) => void;
  getKeysByPlatform: (
    shortcut: ShortcutType
  ) => FindFirstPlatformMatchType | null;
};

export type KeyBindContextState = KeyBindProviderPropsI & KeyBindContextType;

export type FindFirstPlatformMatchType = {
  platform: PlatformType;
  keys: string[];
};
