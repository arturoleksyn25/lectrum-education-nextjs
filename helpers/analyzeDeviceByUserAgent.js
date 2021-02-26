import isMobileDevice from 'ismobilejs';

export const analyzeDeviceByUserAgent = (userAgent) => {
  const detectedAgent = isMobileDevice(userAgent);
  const isMobile = detectedAgent.phone;
  const isTablet = detectedAgent.tablet;
  const isAnyMobile = detectedAgent.any;
  const isDesktop = !isAnyMobile;

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}
