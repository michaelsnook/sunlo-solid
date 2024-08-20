import { A } from '@solidjs/router'
import languages from 'lib/languages'
import { useProfile } from 'lib/queries'
import { For } from 'solid-js'
import { lang } from 'types/main'

export default function LearnIndexPage() {
	const query = useProfile()
	return (
		<main class="caret-white">
			<h1 class="h1">Your decks</h1>
			<div class="flex flex-shrink flex-col flex-wrap gap-4">
				<For each={query.data?.deckLanguages}>
					{(lang: lang) => (
						<A href={`/learn/${lang}`} tabIndex={1} class="card-white">
							<h2 class="h2">
								{languages[lang]} <span class="sub">[{lang}]</span>
							</h2>
							<div>{JSON.stringify(query.data?.decksMap[lang], null, 2)}</div>
						</A>
					)}
				</For>
			</div>
		</main>
	)
}
