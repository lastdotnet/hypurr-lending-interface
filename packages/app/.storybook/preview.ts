import { withThemeByClassName } from '@storybook/addon-themes'
import { WithFixedDate, WithQueryClient } from './decorators'

import '../src/css/fonts.css'
import '../src/css/main.css'
import { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    chromatic: {
      delay: 250, // Some components use hook for media queries, and chromatic might take a screenshot too early
      pauseAnimationAtEnd: false, // stops css animations at first frame
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '760px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '1024px',
          },
        },
      },
    },
  },

  decorators: [
    WithQueryClient(),
    WithFixedDate(),
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    // NOTE: order matters, this decorator must be the last one
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
