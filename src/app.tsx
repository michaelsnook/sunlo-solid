import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { ParentProps, PropsWithChildren, Suspense } from 'solid-js'
import './app.css'
import Sidebar from 'components/sidebar'

export default function App() {
	return (
		<div class="flex min-h-screen flex-row bg-[hsl(210,100,15)] text-white">
			<Router root={RootLayout}>
				<FileRoutes />
			</Router>
		</div>
	)
}

function RootLayout(props: ParentProps) {
	return (
		<>
			<Sidebar />
			<div class="@container mx-auto w-full max-w-[1100px] px-[1%] py-20">
				<Suspense>{props.children}</Suspense>
			</div>
		</>
	)
}
