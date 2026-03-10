import { devices, BrowserContext, chromium, firefox, webkit, Browser } from '@playwright/test';

let caps:any;

export async function browserSetUp(browser: any,video:boolean): Promise<BrowserContext> {

  const platform = (process.env.PLATFORM || `DESKTOP_LOCAL_CHROME`).toUpperCase();

  const options: OPTIONS = OPTIONS[platform as keyof OPTIONS];

  let devicesSettings = {};

  if (options.includes('DESKTOP_LOCAL')) {
    devicesSettings = {};
  }
  else if (options.includes('MOBILE_IOS')) {
     devicesSettings = {
      ...devices[process.env.MOBILE_DEVICE_IOS || 'Pixel 5']
    }
  }
  else if (options.startsWith('MOBILE_ANDROID')) {
    devicesSettings = {
      ...devices[process.env.MOBILE_DEVICE_ANDROID || 'Pixel 5']
    }
  }
  else if (options.startsWith('LAMBDA_DESKTOP')) {
    if (options.includes('CHROME') || options.includes('FIREFOX')) {
      return await lambdaSetUp('chrome');
    } else if (options.includes('SAFARI')) {
      return await lambdaSetUp('safari');
    }
    else {
      throw new Error(`Invalid Browser SetUp`)
    }
  }else if(options.startsWith('LAMBDA_MOBILE')){
    if(options.includes('ANDROID')){
      return await lambdaSetUp('android');
    }else if(options.includes('IOS')){
      return await lambdaSetUp('IOS');
    }else{
      throw new Error(`Invalid Mobile Browser SetUp`)
    }
  }
  // Browser is managed by playwright.config.ts - passed as parameter
  return await browser.newContext({ ...devicesSettings ,recordVideo: video ? { dir: 'test-results/' } : undefined});
}

async function lambdaSetUp(browser: string, mobile?:string) {
if(browser){
  const isSafari = browser.toLowerCase() === 'safari';

   caps = {
    browserName: `${browser}`,
    browserVersion: 'latest',
    'LT:Options': {
      platform: isSafari ? 'macOS Sonoma' : 'Windows 11',
      build: 'Playwright Hybrid Build',
      name: `Desktop ${browser} Test`,
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY
    }
  };
}

if(mobile){
const isAndroid = mobile.toLowerCase() === 'android';
  caps = {
    browserName: isAndroid ? 'chrome' : 'pw-webkit', // ✅ must be supported
    'LT:Options': {
      platformName: isAndroid ? 'Android' : 'iOS',
      deviceName: isAndroid ? 'Galaxy M31' : 'iPhone 15 Pro',
      isRealMobile: true,
      build: 'Playwright MOBILE Hybrid Build',
      name: isAndroid ? 'Android Test' : 'iOS Test',
      network: true,
      visual: true,
      video: true,
      console: true,
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
    }
  };
}


  const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(caps))}`;
  const remoteBrowser = await chromium.connect(wsEndpoint);
  return await remoteBrowser.newContext();
}


enum OPTIONS {
  DESKTOP_LOCAL_CHROME = 'DESKTOP_LOCAL_CHROME',
  DESKTOP_LOCAL_SAFARI = 'DESKTOP_LOCAL_SAFARI',
  DESKTOP_LOCAL_WEBKIT = 'DESKTOP_LOCAL_WEBKIT',
  MOBILE_ANDROID_CHROME = 'MOBILE_ANDROID_CHROME',
  MOBILE_IOS_CHROME = 'MOBILE_IOS_CHROME',
  MOBILE_IOS_SAFARI = 'MOBILE_IOS_SAFARI',
  LAMBDA_DESKTOP_SAFARI = 'LAMBDA_DESKTOP_SAFARI',
  LAMBDA_DESKTOP_CHROME = 'LAMBDA_DESKTOP_CHROME',
  LAMBDA_DESKTOP_FIREFOX = 'LAMBDA_DESKTOP_FIREFOX',
  LAMBDA_MOBILE_ANDROID_CHROME = 'LAMBDA_MOBILE_ANDROID_CHROME',
  LAMBDA_MOBILE_IOS_SAFARI = 'LAMBDA_MOBILE_IOS_SAFARI',
}