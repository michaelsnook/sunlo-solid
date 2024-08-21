import { createSignal, JSXElement, onMount } from 'solid-js'
import supabase from 'lib/supabase-client'
import { uuid } from 'types/main'
import { QueryClient } from '@tanstack/solid-query'

type AuthState = {
  isAuth: boolean
  userId: uuid | undefined
  userEmail: string | undefined
  isPending: boolean
}

const blankAuth: AuthState = {
  isAuth: false,
  userId: '',
  userEmail: '',
  isPending: true,
}

// right now it's not doing context-provider, just attaching the listener, and
// tracking state (locally; there is no useAuthContext implemented here).
export const AuthStateProvider = ({
	queryClient,
	children,
}: {
	queryClient: QueryClient
	children: JSXElement
}) => {
	const [auth, setAuth] = createSignal(blankAuth)
	onMount(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				// if it's a logout or null user, we should remove user data from cache
				if (event === 'SIGNED_OUT' || typeof session?.user !== 'object') {
					queryClient.resetQueries({ queryKey: ['user'] })
				} else {
					const authNew = {
						isAuth: session?.user.role === 'authenticated',
						userId: session?.user.id,
						userEmail: session?.user.email,
						isPending: false,
					}
					// Perhaps add a shouldUpdate check?
					// But most components will only subscribe to 1 or 2 fields
					setAuth(authNew)
					// if for some reason the new user is a different user, remvoe cache
					if (session?.user.id !== auth().userId) {
						queryClient.resetQueries({ queryKey: ['user'] })
					}
				}
			}
		)
		return () => {
			listener.subscription.unsubscribe()
		}
	})
	return children
}
