import { Params } from '@solidjs/router'
import languages from 'lib/languages'
import { useDeckMeta } from 'lib/resource-deck'
import { useLanguageMeta } from 'lib/resource-language'
import { Show } from 'solid-js'

export default function LearnLangPage(props: { params: Params }) {
	const deckQuery = useDeckMeta(() => props.params.lang)
	const langQuery = useLanguageMeta(() => props.params.lang)
	return (
		<main>
			<h1 class="h1">Learning {languages[props.params.lang]}</h1>
			<Show when={deckQuery.data && langQuery.data}>
				<div class="card-white">
					<p>
						some clever UI showing &ldquo;{deckQuery.data.count_reviews_7d}{' '}
						recent reviews&rdquo; of your &ldquo;{deckQuery.data.cards_active}{' '}
						cards you&apos;re learning&rdquo;
					</p>
					<p>
						some clever UI showing &ldquo;{langQuery.data.learners} people
						learning&rdquo; and &ldquo;{langQuery.data.phrases_to_learn}{' '}
						different phrases to learn&rdquo;
					</p>
					<hr />
					{JSON.stringify(deckQuery.data)}
					{JSON.stringify(langQuery.data)}
				</div>
			</Show>
		</main>
	)
}
