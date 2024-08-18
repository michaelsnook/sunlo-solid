import { Params } from '@solidjs/router'

export default function LearnLangPage({
	params: { lang },
}: {
	params: Params
}) {
	// do a suspense query to preload everything
	return <>learn {lang}...</>
}
