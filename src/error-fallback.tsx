import ShowError from 'components/show-error'

const MessageContents = (props: { error: Error; reset: () => void }) => {
	return (
		<>
			<p>Something unexpected has gone wrong:</p>
			<pre>&ldquo;{props.error?.message}&rdquo;</pre>
			<p>
				Perhaps you would like to{' '}
				<a class="s-link" onClick={props.reset}>
					reset the page
				</a>{' '}
				or use your back button to return to the previous page.
			</p>
		</>
	)
}

export function GlobalErrorFallback(error: Error, reset: () => void) {
	return (
		<div class="w-app grid h-screen place-content-center py-10">
			<ShowError when={true}>
				<MessageContents error={error} reset={reset} />
			</ShowError>
		</div>
	)
}

export function ErrorFallback(error: Error, reset: () => void) {
	return (
		<ShowError when={true}>
			<MessageContents error={error} reset={reset} />
		</ShowError>
	)
}
