import { Component, createSignal, createEffect, onCleanup } from 'solid-js'
import { useLocation } from '@solidjs/router'
import { cn } from 'lib/utils'

export const PageTransition: Component = (props: { children: Element }) => {
	const [isVisible, setIsVisible] = createSignal(false)
	const location = useLocation()
	createEffect(() => {
		setIsVisible(false)
		// This will re-run whenever the pathname changes
		const currentPath = location?.pathname
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 200) // Small delay to ensure new content is ready

		onCleanup(() => clearTimeout(timer))
	})

	return (
		<div
			class={cn(
				'transition-opacity duration-300 ease-in',
				isVisible() ? 'opacity-100' : 'invisible opacity-0'
			)}
		>
			{props.children}
		</div>
	)
}
