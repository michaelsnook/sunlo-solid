import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'

export default function App() {
	return (
		<div class="flex min-h-screen flex-row bg-[hsl(210,100,15)] text-white">
			<Router
				root={props => (
					<>
						{/*<Sidebar />*/}
						<div class="@container mx-auto w-full max-w-[1100px] px-[1%] py-20">
							<Suspense>{props.children}</Suspense>
						</div>
					</>
				)}
			>
				<FileRoutes />
			</Router>
		</div>
	)
}
