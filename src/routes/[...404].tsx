import { A } from "@solidjs/router";
import { GarlicBroccoli } from 'components/garlic'

export default function NotFound() {
	return (
		<main class="mx-auto p-4 text-center">
			<GarlicBroccoli classes="mx-auto" />
			<h1 class="max-6-xs my-16 text-6xl font-thin uppercase">
				404 - Not Found
			</h1>
			<p>Sadly we cannot find this page, even a little bit.</p>
		</main>
	)
}
