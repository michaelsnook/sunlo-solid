import { Tables, TablesInsert } from './supabase'
export type uuid = string
export type pids = Array<uuid>
export type lang = string // with length of 3

export type ProfileFull = Tables<'user_profile'> & {
	decksMap: DecksMap
	deckLanguages: Array<lang>
}

export type DecksMap = null | {
	[key: lang]: DeckMeta
}
export type DeckMeta = Tables<'user_deck_plus'> & { lang: string }
}
export type DeckFetched = DeckMeta & {
	cards: Array<CardFull>
}
// we are not literally using a map, but maybe we should!
export type CardsMap = {
	[key: uuid]: CardFull
}

export type DeckLoaded = {
	meta: DeckMeta
	pids: pids
	cards: CardsMap
}

export type CardFull = CardMeta & {
	reviews?: Array<ReviewMeta>
}
