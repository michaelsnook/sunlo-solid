import type { uuid } from 'types/main'
import type { QueryClient } from '@tanstack/solid-query'
import type { Session } from '@supabase/supabase-js'
import {
	type JSXElement,
	batch,
	createContext,
	createMemo,
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
}

// Define the shape of our context
// Note: we don't export the setter bc it all happens right here
type AuthContextValue = {
	isAuth: () => boolean
	getUid: () => string
	getEmail: () => string
}

export const AuthContext = createContext<AuthContextValue>()

export const AuthStateProvider = (props: {
	queryClient: QueryClient
	children: JSXElement
}) => {
	const [user, setUser] = createStore<SessionUser>({
		email: '',
		id: '',
		role: '',
	})

	onMount(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event: string, session: Session | null) => {
				const newUser = {
					email: session?.user?.email || '',
					id: session?.user.id || '',
					role: session?.user.role || '',
				}
				setUser(newUser)
				// uncache user data when it's a sign out, no user, not auth'd, different user
				if (
					event === 'SIGNED_OUT' ||
					session?.user.role !== 'authenticated' ||
					session.user.id !== user.id
				) {
					props.queryClient.resetQueries({ queryKey: ['user'] })
				}
				console.log(`Finished callback for "${event}"`, newUser)
			}
		)
		onCleanup(() => {
			listener.subscription.unsubscribe()
		})
	})

	return (
		<AuthContext.Provider
			value={{
				isAuth: createMemo(() => user.role === 'authenticated'),
				getUid: createMemo(() => user.id ?? ''),
				getEmail: createMemo(() => user.email ?? ''),
				// setSession: (newSession) => setSession(newSession),
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
