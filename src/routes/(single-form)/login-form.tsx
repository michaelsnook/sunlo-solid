import { A } from '@solidjs/router'
// import supabase from 'lib/supabase-client'
import { cn } from 'lib/utils'

export function LoginForm() {
	const login = {
		isPending: false,
		error: null,
		mutate: () => {
			console.log(`Mutate!`)
		},
	}
	return (
		<>
			<h1 class="h3 text-base-content/90">Please log in</h1>
			<form role="form" onSubmit={login.mutate} class="form">
				<fieldset class="flex flex-col gap-y-4" disabled={login.isPending}>
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
