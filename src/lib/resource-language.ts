import { createQuery, type CreateQueryResult } from '@tanstack/solid-query'
import supabase from 'lib/supabase-client'
import {
	LanguageFetched,
	LanguageLoaded,
	LanguageMeta,
	PhrasesMap,
	pids,
} from 'types/main'
import { mapArray } from 'lib/utils'

const qs = {
	phrase_full: () => `*, translations:phrase_translation(*)` as const,
	language_full: () => `*, phrases:phrase_plus(${qs.phrase_full()})` as const,
}

export async function fetchLanguage(lang: string): Promise<LanguageLoaded> {
	const { data } = await supabase
		.from('language_plus')
		.select(qs.language_full())
		.eq('lang', lang)
		.maybeSingle()
		.throwOnError()
	const { phrases: phrasesArray, ...meta }: LanguageFetched = data
	const pids: pids = phrasesArray?.map(p => p.id)
	const phrases: PhrasesMap = mapArray(phrasesArray, 'id')
	return {
		meta,
		pids,
		phrases,
	}
}

// Inputs for any kind of deck query we want to construct
type LanguageQuery = {
	lang: () => string
	select: (deck: LanguageLoaded) => any
}

// The parent query and cache for each deck
export function useLanguageQuery({ select, lang }: LanguageQuery) {
	return createQuery(() => ({
		queryKey: ['language', lang()],
		queryFn: async () => {
			return await fetchLanguage(lang())
		},
		select,
		enabled: typeof lang() === 'string' && lang().length === 3,
		gcTime: 1_200_000,
		staleTime: 120_000,
		refetchOnWindowFocus: false,
	}))
}

// Pass a `lang` accessor and get back your deck metadata
export const useLanguageMeta = (lang: () => string) => {
	return useLanguageQuery({
		lang,
		select: data => data.meta,
	}) as CreateQueryResult<LanguageMeta>
}
