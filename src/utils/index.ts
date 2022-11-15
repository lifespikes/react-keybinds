import { ShortcutType } from '../types';

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

export const findShortcut = (shortcuts: ShortcutType[], keys: string[]) => {
  if (keys.length === 0) {
    return null;
  }

  for (const shortcut of shortcuts) {
    const shortcutKeys = shortcut.keys;

    if (arraysAreEqual(shortcutKeys, keys)) {
      return shortcut;
    }
  }

  return null;
};

export const isDuplicate = (
  shortcuts: ShortcutType[],
  shortcut: ShortcutType
) => {
  return !!findShortcut(shortcuts, shortcut.keys);
};
