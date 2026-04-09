import type { Preview } from "@storybook/react";
import "@patternfly/react-core/dist/styles/base.css";
import { BrowserRouter } from "react-router-dom";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    docs: { toc: true },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default preview;
