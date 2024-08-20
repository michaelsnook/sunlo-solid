import { Router } from '@solidjs/router'
import { ParentProps, Suspense } from 'solid-js'
import { FileRoutes } from '@solidjs/start/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import './app.css'
import Sidebar from 'components/sidebar'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 120_000, gcTime: 1_200_000 },
	},
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router root={RootLayout}>
				<FileRoutes />
			</Router>
			<SolidQueryDevtools />
		</QueryClientProvider>
	)
}

function RootLayout(props: ParentProps) {
	return (
		<div class="flex min-h-screen flex-row bg-[hsl(210,100,15)] text-white">
			<Suspense>
				<Sidebar />
				<div class="@container mx-auto w-full max-w-[1100px] px-[1%] py-20">
					{props.children}
				</div>
			</Suspense>
		</div>
	)
}
