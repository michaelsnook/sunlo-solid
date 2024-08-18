import { JSXElement } from 'solid-js'

export default function Layout({ children }: { children: JSXElement }) {
	return <div class="mx-auto mt-[10cqh] w-full max-w-md">{children}</div>
}
