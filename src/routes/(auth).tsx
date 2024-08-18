import { JSXElement } from 'solid-js'

export default function AuthLayout({ children }: { children: JSXElement }) {
	console.log(`This is an auth guard! not a very good one.`)
	return <>{children}</>
}
