import { Params } from '@solidjs/router'
import { useDeckMeta } from 'lib/resource-deck'

export default function LearnLangPage(props: { params: Params }) {
	const deck = useDeckMeta(() => props.params.lang)
	return (
		<main class="card-white">
			learn {props.params.lang}... {JSON.stringify(deck?.data)}
		</main>
	)
}
