import type { uuid } from 'types/main'
import type { QueryClient } from '@tanstack/solid-query'
import type { Session } from '@supabase/supabase-js'
import {
	createContext,
	createMemo,
	JSXElement,
	onMount,
	useContext,
} from 'solid-js'
// import { createStore } from 'solid-js/store'
import supabase from 'lib/supabase-client'
import { createStore } from 'solid-js/store'

// Define the shape of our session
type SessionUser = {
	email: string
	id: uuid
	role: string
}

// Define the shape of our context
type AuthContextValue = {
	isAuth: () => boolean
	getUid: () => string
	getEmail: () => string
	// setSession: (session: Session) => void;
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
		return () => {
			listener.subscription.unsubscribe()
		}
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
