// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60_000,
  reporter: [['list'], ['html']],
  use: {
    headless: true,
  },
});
