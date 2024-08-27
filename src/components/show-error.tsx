import { ParentProps, Show } from 'solid-js'

export default function ShowError(props: ParentProps & { when?: boolean }) {
	return (
		<Show when={props.when}>
			<div class="alert alert-error bg-error/30 text-base-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width={2}
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>{props.children || `An unknown error has occurred (sorry)`}</div>
			</div>
		</Show>
	)
}
