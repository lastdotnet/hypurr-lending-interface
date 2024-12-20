import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { StorybookErrorBoundary } from '@storybook/ErrorBoundary'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'

/**
 * Expecting a rendering error is a bit tricky. We need to use error boundaries and even then normal matchers don't work. This function is a helper to make it easier.
 */
export function expectRenderingError(reactNode: ReactNode, expectedError: string) {
  const { baseElement } = render(
    <DynamicContextProvider
      settings={{
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <StorybookErrorBoundary>{reactNode}</StorybookErrorBoundary>
    </DynamicContextProvider>,
  )

  expect(baseElement.innerHTML).toContain(expectedError)
}
