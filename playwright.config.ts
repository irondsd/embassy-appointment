import { expect, PlaywrightTestConfig, Locator } from '@playwright/test'

expect.extend({
  /*

    Add "toBeOnePage" sugar method to easy check that elements exist on Playwright page.
    If element doesn't exist correct error message will be shown (not just timeout).

    await expect('text=Brand page').toBeOnPage()

    await expect('text=Brand page').not.toBeOnPage()

  */
  async toBeOnPage(locator: Locator) {
    const element = await locator.elementHandle()

    if (!element) {
      return {
        // @ts-ignore
        message: () => `the element "${locator._selector}" doesn't exist on page.`,
        pass: false,
      }
    }

    return {
      // @ts-ignore
      message: () => `the element "${locator._selector}" shouldn't exist on page.`,
      pass: true,
    }
  },
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () => 'passed',
        pass: true,
      }
    } else {
      return {
        message: () => 'failed',
        pass: false,
      }
    }
  },
})

const config: PlaywrightTestConfig = {
  timeout: 60000,
  workers: 1,
  fullyParallel: false,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
  },
}

export default config
