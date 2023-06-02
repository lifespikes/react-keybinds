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

export const findShortcutIndex = (
  shortcuts: ShortcutType[],
  keys: string[]
) => {
  if (!hasItems(keys)) {
    return -1;
  }

  let index = 0;
  for (const shortcut of shortcuts) {
    const shortcutKeys = getShortcutKeys(shortcut);
    if (arraysAreEqual(shortcutKeys, keys)) {
      return index;
    }
    index++;
  }

  return -1;
};

export const findShortcut = (shortcuts: ShortcutType[], keys: string[]) => {
  const shortcutIndex = findShortcutIndex(shortcuts, keys);
  return shortcutIndex > -1 ? shortcuts[shortcutIndex] : null;
};

export const getShortcutWithDefaultValues = (
  shortcut: ShortcutType,
  platform: PlatformType = 'Mac'
): ShortcutType => {
  const platforms: PlatformType[] = [
    'iOS',
    'Mac',
    'Android',
    'Windows',
    'Linux',
  ];

  const defaultKeys =
    Object.values(shortcut.keys)[0] ?? shortcut.keys[platform];

  const keys = platforms.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: shortcut.keys[curr] ?? defaultKeys,
    };
  }, {});
  return {
    ...shortcut,
    keys,
    _defaultKeys: shortcut.keys,
  };
};

export const logMsg = (short: ShortcutType, short2: ShortcutType) =>
  `Shortcut is duplicated: label: "${short.label}", keys: "${JSON.stringify(
    short.keys
  )}" ,replacing for: label: "${short2.label}", keys: "${JSON.stringify(
    short2.keys
  )}"...`;
