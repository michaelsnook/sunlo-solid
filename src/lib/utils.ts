import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// this is type-funky bc we're using dynamic keys (TODO consider Map)
export function mapArray<T, K extends keyof T>(arr: Array<T>, key: string) {
	// @ts-ignore
	let result: { [key: K]: T } = {}
	// @ts-ignore
	const valids = arr.filter((item: T) => typeof item[key] === 'string')
	if (!valids.length) return null
	valids.forEach(item => {
		// @ts-ignore
		result[item[key]] = item
	})
	return result
}
