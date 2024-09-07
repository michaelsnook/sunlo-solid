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
export type CardMeta = Tables<'user_card_plus'>
export type ReviewMeta = Tables<'user_card_review_plus'>


/* Un-authenticated data about Languages and Phrases */
export type LanguageFetched = LanguageMeta & {
  phrases: Array<PhraseFull>
}
export type LanguageMeta = Tables<'language_plus'>
export type LanguageLoaded = {
  meta: LanguageMeta
  pids: pids
  phrases: {
    [key: string]: PhraseFull
  }
}
export type PhraseFull = PhraseMeta & {
  translations: Array<TranslationRow>
}
export type PhraseMeta = Tables<'phrase_plus'>
export type TranslationRow = Tables<'phrase_translation'>
export type PhrasesMap = {
  [key: uuid]: PhraseFull
}
