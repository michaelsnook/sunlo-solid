import { Params } from '@solidjs/router'
import languages from 'lib/languages'
import { useDeckMeta } from 'lib/resource-deck'
import { Show } from 'solid-js'

export default function LearnLangPage(props: { params: Params }) {
	const deckQuery = useDeckMeta(() => props.params.lang)
	return (
		<main>
			<h1 class="h1">Learning {languages[props.params.lang]}</h1>
			<Show when={deckQuery.data}>
				<div class="card-white">{JSON.stringify(deckQuery.data)}</div>
			</Show>
		</main>
	)
}
