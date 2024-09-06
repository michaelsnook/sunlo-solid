import { Router } from '@solidjs/router'
import { ParentProps, Suspense, ErrorBoundary } from 'solid-js'
import { FileRoutes } from '@solidjs/start/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { Toaster } from 'solid-toast'
import { Sidebar } from 'sidebar'
import { AuthStateProvider } from 'auth-state-provider'
import { ErrorFallback, GlobalErrorFallback } from 'error-fallback'
import './app.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 120_000, gcTime: 1_200_000 },
	},
})

export default function App() {
	return (
		<ErrorBoundary fallback={GlobalErrorFallback}>
			<AuthStateProvider queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					<Router root={RootLayout}>
						<FileRoutes />
					</Router>
					<SolidQueryDevtools />
				</QueryClientProvider>
				<Toaster position="top-center" />
			</AuthStateProvider>
		</ErrorBoundary>
	)
}

function RootLayout(props: ParentProps) {
	return (
		<div class="flex min-h-screen flex-row">
			<Sidebar />
			<div class="mx-auto w-full max-w-[1100px] px-[1%] py-20 @container">
				<Suspense>
					<ErrorBoundary fallback={ErrorFallback}>
						{props.children}
					</ErrorBoundary>
				</Suspense>
			</div>
		</div>
	)
}
