import { cn } from 'lib/utils'

export const Garlic = ({ size = 50, classes = '' }) => (
	<img
		src="/images/garlic.png"
		alt="a smiling garlic"
		width={size}
		height={size}
		style={{
			filter: 'drop-shadow(0px 0px 2px #fff)',
		}}
		class={cn('place-self-center', classes)}
	/>
)

export const GarlicBroccoli = ({ size = 240, classes = '' }) => (
	<img
		src="/images/logo-pair.png"
		alt="a smiling garlic"
		width={size}
		height={size / 1.5}
		class={cn('place-self-center', classes)}
	/>
)
