import { A, useNavigate } from '@solidjs/router'
import supabase from 'lib/supabase-client'
import { cn } from 'lib/utils'
import { createForm } from '@felte/solid'
import toast from 'solid-toast'
import ShowError from 'components/show-error'
import {
	createMutation,
	CreateMutationOptions,
	MutationKey,
} from '@tanstack/solid-query'
import { AuthError } from '@supabase/supabase-js'

type LoginFormData = {
	email: string
	password: string
}

const key: MutationKey = ['login']

export function LoginForm() {
	const navigate = useNavigate()
	const login = createMutation<any, AuthError>(() => ({
		mutationKey: key,
		mutationFn: async (formData: unknown) => {
			const { data, error } = await supabase.auth.signInWithPassword(
				formData as LoginFormData
			)
			if (error) {
				console.log(`Failed to sign in`, error)
				throw error
			}
			return data
		},
		onError: error => {
			toast.error('Error signing in')
		},
		onSuccess: data => {
			toast.success('Signed in')
			navigate('/learn')
		},
	}))

	const { form } = createForm({
		onSubmit: params => login.mutate(params),
	})

	return (
		<>
			<h1 class="h3 text-base-content/90">Please log in</h1>
			<form use:form role="form" class="form" method="post">
				<fieldset
					class={cn(
						'flex flex-col gap-y-4',
						login.isPending ? 'opacity-50' : ''
					)}
					disabled={login.isPending}
				>
					<div>
						<label for="email">Email</label>
						<input
							id="email"
							name="email"
							required={true}
							pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
							// aria-invalid={login.error?.email ? true : false}
							class={cn(
								// login.error?.email ? 'border-error/60' : '',
								's-input'
							)}
							tabIndex={1}
							type="email"
							placeholder="email@domain"
						/>
					</div>
					<div>
						<p>
							<label for="password">Password</label>
						</p>
						<input
							id="password"
							name="password"
							required={true}
							// aria-invalid={login.error?.password ? 'true' : 'false'}
							class={cn(
								's-input'
								// login.error?.password ? 'border-error/60' : ''
							)}
							tabIndex={2}
							type="password"
							placeholder="* * * * * * * *"
						/>
					</div>

					<ShowError when={!!login.error?.status}>
						{login.error?.status === 400 ?
							'Invalid user name or password. (You might need to create a new account.)'
						:	'An unknown error has occured. (sorry)'}
					</ShowError>

					<div class="flex flex-row justify-between">
						<button
							tabIndex={3}
							class="btn btn-primary"
							type="submit"
							disabled={login.isPending}
							aria-disabled={login.isPending}
						>
							Log in
						</button>
						<A tabIndex={4} href="/signup" class="btn btn-ghost">
							Create account
						</A>
					</div>
					<p>
						<A href="/forgot-password" class="s-link text-sm">
							Forgot password?
						</A>
					</p>
				</fieldset>
			</form>
		</>
	)
}
