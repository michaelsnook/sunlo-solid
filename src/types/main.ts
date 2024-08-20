import { Tables, TablesInsert } from './supabase'
export type lang = string // with length of 3

export type ProfileFull = ProfileMeta & {
	decksMap: DecksMap
	deckLanguages: Array<lang>
}

export type DecksMap = {
	[key: lang]: DeckMeta
}
export type DeckMeta = Tables<'user_deck_plus'> & { lang: string }
