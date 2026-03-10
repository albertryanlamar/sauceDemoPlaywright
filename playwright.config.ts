import { defineConfig, devices } from '@playwright/test';
import './src/config/envConfig';
import reportPortal from '@reportportal/agent-js-playwright';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 * 
 */
const rawPlatform = process.env.PLATFORM || '';
const platform = rawPlatform.toUpperCase();

let browserName: string;
if (platform.includes('CHROME')) {
  browserName = 'chromium';
} else if (platform.includes('FIREFOX')) {
  browserName = 'firefox';
} else if (platform.includes('SAFARI')) {
  browserName = 'webkit';
} else {
  throw new Error(`Invalid or missing PLATFORM env var: "${process.env.PLATFORM}"`);
}

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  
  retries: process.env.CI ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:      [ 
       ['junit',{outputFile:'report/junit-report/junit.xml'}],
       ['html',{open:'never',outputFolder:'report/html-report'}],
       ['allure-playwright',{ resultsDir: 'report/allure-results' }],
       //[reportPortal.default, { configFile: './reportPortal.config.js' }] // ✅ RP integration,
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video:'on',
    
  },
  outputDir: 'test-results',

  /* Configure projects for major browsers */
  projects: [
    {
      name: browserName,
      use: {
        ...(browserName === 'chromium' && devices['Desktop Chrome']),
        ...(browserName === 'firefox' && devices['Desktop Firefox']),
        ...(browserName === 'webkit' && devices['Desktop Safari']),
        browserName: browserName as 'chromium' | 'firefox' | 'webkit',
      }
    }
    /*
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
