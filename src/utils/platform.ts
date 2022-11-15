export type PlatformType = 'Mac' | 'Windows' | 'Linux' | 'iOS' | 'Android';
export type PlatformCollectionType = { [key in PlatformType]: string };

export default class PlatformDetector {
  private platform: string;

  platforms: PlatformCollectionType = {
    Mac: 'mac',
    Windows: 'win',
    iOS: 'ios',
    Android: 'android',
    Linux: 'linux',
  };

  constructor() {
    this.platform = this.getPlatForm().toLowerCase();
  }

  getPlatForm() {
    // 2022 way of detecting. Note : this userAgentData feature is available only in secure contexts (HTTPS)
    const userAgentData = (navigator as any).userAgentData;

    if (typeof userAgentData !== 'undefined' && userAgentData !== null) {
      return userAgentData.platform;
    }
    // Deprecated but still works for most of the browser
    if (typeof navigator.platform !== 'undefined') {
      if (
        typeof navigator.userAgent !== 'undefined' &&
        /android/.test(navigator.userAgent.toLowerCase())
      ) {
        // android device’s navigator.platform is often set as 'linux', so let’s use userAgent for them
        return 'android';
      }
      return navigator.platform;
    }
    return 'win';
  }

  isPlatform(platform: PlatformType) {
    return new RegExp(`${this.platforms[platform] ?? 'win'}`).test(
      this.platform
    );
  }

  isMac() {
    return this.isPlatform('Mac');
  }

  isWindows() {
    return this.isPlatform('Windows');
  }

  isLinux() {
    return this.isPlatform('Linux');
  }

  isAndroid() {
    return this.isPlatform('Android');
  }

  currentPlatform() {
    return Object.keys(this.platforms).filter(key =>
      this.isPlatform(key as PlatformType)
    )[0];
  }

  isIos() {
    return ['iphone', 'ipad', 'ipod'].includes(this.platform);
  }

  isApple() {
    return this.isIos() || this.isMac();
  }
}
