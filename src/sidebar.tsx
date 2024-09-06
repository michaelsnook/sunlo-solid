import supabase from 'lib/supabase-client'
import { For, createSignal, Show, Accessor } from 'solid-js'
import { Garlic } from './components/garlic'
import { cn } from 'lib/utils'
import { A } from '@solidjs/router'
import languages from 'lib/languages'
import { lang } from 'types/main'
import { useProfile } from 'lib/resource-profile'
import toast from 'solid-toast'

type LinkType = { text: string; href: string }

const Navlink = ({ text, href }: LinkType) =>
	!text ? null : (
		<A href={href} class="nav-link">
			{text}
		</A>
	)

const staticMenuLinks: Array<LinkType> = [
	{
		text: 'Home',
		href: '/',
	},
	{
		text: 'Log in or sign up',
		href: '/login',
	},
	{
		text: 'Browse Languages',
		href: '/language',
	},
	{
		text: 'Privacy Policy',
		href: '/privacy-policy',
	},
]

export function Sidebar() {
	const query = useProfile()
	const [isOpen, setIsOpen] = createSignal(true)
	const toggle = () => setIsOpen(() => !isOpen())

	const profile = () => query.data ?? null

	const clickSignOut = () => {
		supabase.auth.signOut()
		toast('Signed out')
		// maybe redirect
	}

	return (
		<div id="sidebar-all">
			<SidebarOpener isOpen={isOpen} toggle={toggle} />
			<div
				class={cn(
					'z-20 bg-black bg-opacity-50 pt-10',
					isOpen() ? 'fixed' : 'hidden',
					'bottom-0 left-0 right-0 top-0 md:hidden'
				)}
				onClick={toggle}
			/>
			<nav
				id="main-menu"
				aria-label="Main navigation"
				class={cn(
					isOpen() ? 'fixed md:sticky md:flex' : 'hidden',
					'top-0 z-30 h-screen w-72 flex-col gap-4 overflow-y-auto overflow-x-hidden bg-base-300 p-6 text-base-content'
				)}
			>
				<span class="h4 flex flex-row items-center">
					<Garlic size={50} />
					Sunlo
				</span>

				<Show when={profile()}>
					<A href="/profile" class="nav-link">
						<p class="flex flex-row gap-2">
							<ProfileIcon /> {profile()?.username}
						</p>
					</A>

					<div>
						<p class="my-4 font-bold">
							<Navlink href="/learn" text="Your decks" />
						</p>
						<ul class="flex flex-col gap-2">
							<For each={profile()?.deckLanguages}>
								{(lang: lang) => (
									<li>
										<Navlink href={`/learn/${lang}`} text={languages[lang]} />
									</li>
								)}
							</For>
						</ul>
					</div>
				</Show>

				<div>
					<p class="my-4 font-bold">Menu</p>
					<ul class="flex flex-col gap-2">
						<For each={staticMenuLinks}>
							{({ href, text }) => (
								<li>
									<Navlink href={href} text={text} />
								</li>
							)}
						</For>
					</ul>
				</div>

				<Show when={!!query.data}>
					<p>
						<button class="btn btn-ghost" onClick={clickSignOut}>
							Sign out
						</button>
					</p>
				</Show>
			</nav>
		</div>
	)
}

const SidebarOpener = (props: {
	isOpen: Accessor<boolean>
	toggle: () => void
}) => (
	<button
		class={`btn-outline btn-primary fixed bottom-4 left-3 z-50 rounded-full border border-primary bg-white p-2`}
		role="button"
		aria-haspopup={true}
		aria-label="Toggle main menu"
		aria-expanded={props.isOpen()}
		aria-controls="main-menu"
		onClick={props.toggle}
		tabIndex={0}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width={2}
				d="M4 8h16M4 16h16"
			/>
		</svg>
	</button>
)

const ProfileIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width={1.5}
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	)
}
