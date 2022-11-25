import { ShortcutType, KeysType, FindFirstPlatformMatchType } from '../types';
import PlatformDetector from './platform';
import { PlatformType } from '../types/platform.type';

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

export const findFirstPlatformMatch = (
  keys: KeysType
): FindFirstPlatformMatchType | null => {
  const match =
    Object.entries(keys as Record<any, any>).filter(([, value]) =>
      hasItems(value)
    )[0] ?? [];

  return hasItems(match)
    ? {
        platform: match[0] as PlatformType,
        keys: match[1] as string[],
      }
    : null;
};

export const getShortcutKeys = (shortcut: ShortcutType) => {
  const platform = new PlatformDetector().currentPlatform();

  const keys: string[] | undefined = shortcut.keys[platform];

  if (!keys) {
    const defaultPlatform = findFirstPlatformMatch(shortcut.keys);

    console.warn(
      `No keys found for platform "${platform}" in "${shortcut.label}" ${
        defaultPlatform
          ? `using keys for platform "${defaultPlatform.platform}"`
          : ''
      }`
    );

    return defaultPlatform ? defaultPlatform.keys : [];
  }

  return keys;
};

export const findShortcut = (shortcuts: ShortcutType[], keys: string[]) => {
  if (!hasItems(keys)) {
    return null;
  }

  for (const shortcut of shortcuts) {
    const shortcutKeys = getShortcutKeys(shortcut);
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
  return !!findShortcut(shortcuts, getShortcutKeys(shortcut));
};
