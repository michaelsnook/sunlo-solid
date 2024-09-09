import type { uuid } from 'types/main'
import type { QueryClient } from '@tanstack/solid-query'
import type { Session } from '@supabase/supabase-js'
import {
	type ParentProps,
	batch,
	createContext,
	onCleanup,
	onMount,
	useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import supabase from 'lib/supabase-client'

// Define the shape of the data store itself
// This is just a subset of fields on supabase's session.user
type SessionUser = {
	email: string
	id: uuid
	role: string
} | null

const noUser = {
	email: '',
	id: '',
	role: '',
}

// Define the shape of our context
// Note: we don't export the setter bc it all happens right here
// When uninitialized, isAuth is false but the other 2 are null
// When logged out, they will be false and 2 empty strings
type AuthContextValue = {
	isAuth: () => boolean
	getUid: () => string | null
	getEmail: () => string | null
}

export const AuthContext = createContext<AuthContextValue>()

export const AuthStateProvider = (
	props: ParentProps & { queryClient: QueryClient }
) => {
	const [user, setUser] = createStore<SessionUser>(null)

	onMount(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event: string, session: Session | null) => {
				// 1. decide what to do to user state and whether to clear user cache
				const newUserValue =
					session?.user ?
						{
							email: session.user.email,
							id: session.user.id,
							role: session.user.role,
						}
					:	noUser

				const shouldClearCache = event === 'SIGNED_OUT' || !session?.user
				// 2. update user state and reset cache if needed
				// (maybe we should batch these but it doesn't seem to matter yet)
				batch(() => {
					setUser(newUserValue)
					if (shouldClearCache) {
						// uncache user data when the user logs out or changes
						props.queryClient.resetQueries({ queryKey: ['user'] })
					}
					console.log(
						`Handled auth state change: "${event}"${shouldClearCache ? ' and cleared user cache' : ''}`,
						newUserValue
					)
				})
			}
		)
		onCleanup(() => {
			listener.subscription.unsubscribe()
		})
	})

	return (
		<AuthContext.Provider
			value={{
				isAuth: () => user?.role === 'authenticated',
				getUid: () => user?.id ?? null,
				getEmail: () => user?.email ?? null,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext<AuthContextValue | undefined>(AuthContext)
	if (context === undefined) {
		throw new Error('useAuthContext: undefined AuthContext')
	}
	return context
}
