// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // put your test files here
  timeout: 60_000,
  reporter: [['list'], ['html']],
  use: {
    headless: true,
    video: 'on',  // record videos for all tests
  },
});
