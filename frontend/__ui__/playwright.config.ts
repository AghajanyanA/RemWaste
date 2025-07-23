import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 5,
  reporter: 'html',
  use: {
      ignoreHTTPSErrors: true,
      trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173/' },
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: 'yarn --cwd ../../backend start',
    port: 5000,
    reuseExistingServer: !process.env.CI,
  },
});
