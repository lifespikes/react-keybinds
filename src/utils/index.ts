import { ShortcutType } from '../types';
import PlatformDetector from './platform';
export * from './platform';

export const hasItems = (items: any[]) => items.length > 0;

export const arraysAreEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export const getShortcutKeys = (shortcut: ShortcutType) => {
  const platform = new PlatformDetector().currentPlatform();

  const keys = shortcut.keys[platform];

  if (!keys) {
    console.warn(`No keys found for platform ${platform} in ${shortcut.label}`);
    return Object.values(shortcut.keys)[0] ?? [];
  }

  return keys;
};

export const findShortcut = (shortcuts: ShortcutType[], keys: string[]) => {
  if (!hasItems(keys)) {
    return null;
  }

  for (const shortcut of shortcuts) {
    if (arraysAreEqual(getShortcutKeys(shortcut), keys)) {
      return shortcut;
    }
  }

  return null;
};

export const isDuplicate = (
  shortcuts: ShortcutType[],
  shortcut: ShortcutType
) => {
  return !!findShortcut(shortcuts, getShortcutKeys(shortcut));
};
