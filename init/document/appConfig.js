// Core
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const {
  JAVA_SCRIPT_LOADING_DELAY,
  ANDROID_VERSION_FOR_DELAY,
  IOS_VERSION_FOR_DELAY,
} = publicRuntimeConfig;

export const appConfig = {
  javaScriptLoadingDelay: JAVA_SCRIPT_LOADING_DELAY,
  androidVersionForDelay: ANDROID_VERSION_FOR_DELAY,
  iOsVersionForDelay: IOS_VERSION_FOR_DELAY,
};
