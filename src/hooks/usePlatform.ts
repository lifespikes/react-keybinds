import { useMemo } from 'react';
import PlatformDetector from '../utils/platform';

export const usePlatform = () => {
  return useMemo(() => new PlatformDetector(), []);
};
