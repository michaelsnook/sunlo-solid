import { cn } from 'lib/utils'

export const Garlic = (props: { size?: number; classes?: string }) => (
	<img
		src="/images/garlic.png"
		alt="a smiling garlic"
		width={props.size || 50}
		height={props.size || 50}
		style={{
			filter: 'drop-shadow(0px 0px 2px #fff)',
		}}
		class={cn('place-self-center', props.classes)}
	/>
)

export const GarlicBroccoli = (props: { size?: number; classes?: string }) => (
	<img
		src="/images/logo-pair.png"
		alt="a smiling garlic"
		width={props.size || 240}
		height={(props.size || 240) / 1.5}
		class={cn('place-self-center', props.classes)}
	/>
)
