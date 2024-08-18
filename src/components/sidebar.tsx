import { Accessor, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import { Garlic } from 'components/garlic'
// import languages from 'lib/languages'
// import { usePathname, useRouter } from 'next/navigation'
// import { useProfile } from 'app/data/hooks'

import supabase from 'lib/supabase-client'
// import { toast } from 'react-hot-toast'
// import { useAuth } from 'components/auth-context'
import { cn } from 'lib/utils'
import { JSXElement } from 'solid-js'

// Don't keep using these. use the framework's types for links and routes
type LinkType = {
	href: string
	children?: JSXElement
	name?: string
}

type MenuType = LinkType & {
	links: Array<LinkType>
}

const Navlink = ({ href, children, name = '' }: LinkType) => {
	// const pathname = usePathname()
	const isActive = false // = href === pathname
	return (
		<A href={href} class={`nav-link ${isActive ? 'active' : ''}`}>
			{children || name}
		</A>
	)
}

const staticMenuData: MenuType = {
	name: 'Menu',
	href: '',
	links: [
		{
			name: 'Home',
			href: '/',
		},
		{
			name: 'Log in or sign up',
			href: '/login',
		},
		{
			name: 'Browse Languages',
			href: '/language',
		},
	],
}

const GenericMenu = ({ menu }: { menu: MenuType }) => {
	return (
		<div>
			<p class="my-4 font-bold">
				{menu.href ? <Navlink href={menu.href} name={menu.name} /> : menu.name}
			</p>
			<ul class="flex flex-col gap-2">
				{menu.links?.map((i: LinkType) => (
					<li>
						<Navlink href={i.href} name={i.name} />
					</li>
				))}
			</ul>
		</div>
	)
}

/*
const DeckMenu = () => {
	const { data } = useProfile()

	const langs = data?.deckLanguages ?? []
	const menuData = {
		name: 'Learning decks',
		href: '/home',
		links: langs.map((lang: string) => {
			return {
				name: languages[lang],
				href: `/home/${lang}`,
			}
		}),
	}
	return <GenericMenu menu={menuData} />
}
*/

export default function Sidebar() {
	// const { isAuth } = useAuth()
	const [isOpen, setIsOpen] = createSignal(false)

	const isAuth = true

	// const [isOpen, setIsOpen] = useState(false)
	const toggle = () => setIsOpen(() => !isOpen())
	const close = () => setIsOpen(() => false)
	// const pathname = usePathname()
	// const router = useRouter()

	const username = 'lermie' // useProfile()?.data?.username

	// close the sidebar when the user navigates
	/* not anymore */

	return (
		<div id="sidebar-all">
			<SidebarOpener isOpen={isOpen} toggle={toggle} />
			<div
				class={cn(
					'z-20 bg-black bg-opacity-50 pt-10',
					isOpen() ? 'fixed' : 'hidden',
					'bottom-0 left-0 right-0 top-0 md:hidden'
				)}
				// onClick={toggle}
			/>
			<nav
				aria-label="Main navigation"
				class={cn(
					isOpen() ? 'fixed md:sticky md:flex' : 'hidden',
					'bg-base-300 text-base-content top-0 z-30 h-screen w-72 flex-col gap-4 overflow-y-auto overflow-x-hidden p-6'
				)}
			>
				<span class="h4 flex flex-row items-center">
					<Garlic size={50} />
					Sunlo
				</span>
				{username ? (
					<>
						<Navlink href="/profile">
							<p class="flex flex-row gap-2">
								<ProfileIcon /> {username}
							</p>
						</Navlink>

						{/*<DeckMenu />*/}
					</>
				) : null}

				<GenericMenu menu={staticMenuData} />

				{isAuth && (
					<p>
						<button
							class="btn btn-ghost"
							onClick={
								() => supabase.auth.signOut() // .then(() => {
								// toast(`You have logged out`)
								// router?.push('/')
								//})
							}
						>
							Sign out
						</button>
					</p>
				)}
			</nav>
		</div>
	)
}

const SidebarOpener = ({
	isOpen,
	toggle,
}: {
	isOpen: Accessor<boolean>
	toggle: () => void
}) => (
	<button
		class={`btn-outline btn-primary border-primary fixed bottom-4 left-3 z-50 rounded-full border bg-white p-2`}
		role="button"
		aria-haspopup={true}
		aria-label="Toggle main menu"
		aria-expanded={isOpen()}
		aria-controls="main-menu"
		onClick={toggle}
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
