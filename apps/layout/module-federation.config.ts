import { ModuleFederationConfig } from '@nx/webpack';
const config: ModuleFederationConfig = {
  name: 'layout',
  exposes: {
    './Module': './src/remote-entry.ts',
    './placeholder':
      'packages/ui/placeholder-page/src/lib/placeholder-page.tsx',
  },
};
export default config;
