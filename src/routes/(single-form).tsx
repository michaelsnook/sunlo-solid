import type { ParentProps } from 'solid-js'

export default function Layout(props: ParentProps) {
	return <div class="mx-auto mt-[10cqh] w-full max-w-md">{props.children}</div>
}
