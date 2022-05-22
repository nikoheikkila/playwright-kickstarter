import { test as base } from '@playwright/test'

interface CustomOptions {
    isPipeline(): boolean;
}

export const isPipeline = () => !!process.env.CI;

const test = base.extend<CustomOptions>({
    isPipeline: async ({}, use) => {
        await use(isPipeline)
    }
});

export * from '@playwright/test'
export default test;
