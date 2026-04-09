import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

/**
 * GitHub project Pages URLs are /<repo>/... Set when building for deploy, e.g.
 * `STORYBOOK_BASE_PATH=/my-repo/ npm run build-storybook` (trailing slash required for Vite).
 */
function storybookBasePath(): string | undefined {
  const raw = process.env.STORYBOOK_BASE_PATH?.trim();
  if (!raw) return undefined;
  return raw.endsWith("/") ? raw : `${raw}/`;
}

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(viteConfig, { configType }) {
    const base = storybookBasePath();
    if (configType === "PRODUCTION" && base) {
      return mergeConfig(viteConfig, { base });
    }
    return viteConfig;
  },
};

export default config;
