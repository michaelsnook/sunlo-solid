import { CardsMap, DeckFetched, DeckLoaded, DeckMeta, pids } from 'types/main'
import supabase from './supabase-client'
import { mapArray } from 'lib/utils'
import { createQuery, type CreateQueryResult } from '@tanstack/solid-query'
import { useAuth } from 'auth-state-provider'

const qs = {
	card_full: `*, reviews:user_card_review_plus(*)` as const,
	deck_full: () => `*, cards:user_card_plus(${qs.card_full})` as const,
}

async function fetchDeck(lang: string): Promise<DeckLoaded> {
	const { data } = await supabase
		.from('user_deck_plus')
		.select(qs.deck_full())
		.eq('lang', lang)
		.maybeSingle()
		.throwOnError()
	const { cards: cardsArray, ...meta }: DeckFetched = data
	const pids: pids = cardsArray?.map(c => c.phrase_id)
	const cards: CardsMap = mapArray(cardsArray, 'phrase_id')
	return {
		meta,
		pids,
		cards,
	}
}

// Inputs for any kind of deck query we want to construct
type DeckQuery = {
	lang: () => string
	select: (deck: DeckLoaded) => any
}

// The parent query and cache for each deck
export function useDeckQuery({ select, lang }: DeckQuery) {
	const { isAuth } = useAuth()
	return createQuery(() => ({
		queryKey: ['deck', lang()],
		queryFn: async () => {
			return await fetchDeck(lang())
		},
		select,
		enabled: isAuth() && typeof lang() === 'string' && lang().length === 3,
		gcTime: 1_200_000,
		staleTime: 120_000,
		refetchOnWindowFocus: false,
	}))
}

// Pass a `lang` accessor and get back your deck metadata
export const useDeckMeta = (lang: () => string) => {
	return useDeckQuery({
		lang,
		select: data => data.meta,
	}) as CreateQueryResult<DeckMeta>
}
