//https://github.com/storybookjs/storybook/tree/next/addons/docs/web-components
import '../assets/css/styles.css';
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
