// Core
import MobileDetect from 'mobile-detect';

// Other
import { appConfig } from '../appConfig';
import { analyzeDeviceByUserAgent } from 'helpers/analyzeDeviceByUserAgent';

export const getScriptsDelay = ({ userAgent = '' }) => {
  const { isMobile } = analyzeDeviceByUserAgent(userAgent);

  if (isMobile) {
    const {
      javaScriptLoadingDelay,
      androidVersionForDelay,
      iOsVersionForDelay,
    } = appConfig;

    const md = new MobileDetect(userAgent);
    const androidVersion = md.version('Android');
    const iOsVersion = md.version('iOS');

    const isAndroidVersion = !Number.isNaN(androidVersion);
    const isIOsVersion = !Number.isNaN(iOsVersion);

    const isOldAndroid = Math.fround(androidVersion) < Math.fround(androidVersionForDelay);
    const isOldIOs = Math.fround(iOsVersion) < Math.fround(iOsVersionForDelay);

    if (isAndroidVersion || isIOsVersion) {
      if (isOldAndroid || isOldIOs) {
        return javaScriptLoadingDelay;
      }
    }
  }

  return 0;
};
