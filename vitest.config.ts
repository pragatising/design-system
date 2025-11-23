import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'test/',
        'dist/',
        'build/',
        'storybook-static/',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        '**/index.ts',
        '**/*.d.ts',
      ],
      include: ['packages/*/src/**/*.{ts,tsx}'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
  resolve: {
    alias: {
      '@design-system/tokens': resolve(__dirname, './packages/tokens/src'),
      '@design-system/primitives': resolve(__dirname, './packages/primitives/src'),
      '@design-system/components': resolve(__dirname, './packages/components/src'),
      '@design-system/css': resolve(__dirname, './packages/css/src'),
      '@design-system/icons': resolve(__dirname, './packages/icons/src'),
      '@design-system/themes': resolve(__dirname, './packages/themes/src'),
    },
  },
});
