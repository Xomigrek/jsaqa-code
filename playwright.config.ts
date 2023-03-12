const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    timeout: 5 * 60 * 1000,
  },
});