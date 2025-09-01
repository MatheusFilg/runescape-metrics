import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { NuqsAdapter } from 'nuqs/adapters/react'
import type { ReactNode } from 'react'

export const renderQueryClient = <T,>(hook: () => T) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				staleTime: Infinity,
			},
		},
	})

	return renderHook(() => hook(), {
		wrapper: ({ children }: { children: ReactNode }) => (
			<NuqsAdapter>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</NuqsAdapter>
		),
	})
}
