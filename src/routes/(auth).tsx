import { ParentProps } from 'solid-js'

export default function AuthLayout(props: ParentProps) {
	console.log(`This is an auth guard! not a very good one.`)
	return props.children
}
