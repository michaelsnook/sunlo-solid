import { ParentProps } from 'solid-js'

export default function LearnLayout(props: ParentProps) {
	return <div class="w-app">{props.children}</div>
}
