import { PostgrestError } from '@supabase/supabase-js'
import { createQuery, CreateQueryResult } from '@tanstack/solid-query'
import { DeckMeta, DecksMap, lang, ProfileFull } from 'types/main'
import supabase from './supabase-client'
import { mapArray } from './utils'

async function fetchAndShapeProfileFull() {
	const { data } = await supabase
		.from('user_profile')
		.select(`*, decks_array:user_deck_plus(*)`)
		.maybeSingle()
		.throwOnError()
	if (!data) return null
	const { decks_array, ...profile } = data
	const decksMap: DecksMap =
		mapArray<DeckMeta, 'lang'>(decks_array, 'lang') || null
	// @ts-ignore
	const deckLanguages: Array<lang> = decks_array.map(d => d.lang)
	return { ...profile, decksMap, deckLanguages }
}

export function useProfile() {
	return createQuery(() => ({
		queryKey: ['user', 'profile'],
		queryFn: fetchAndShapeProfileFull,
		// enabled: !!userId,
	})) as CreateQueryResult<ProfileFull, PostgrestError>
}
