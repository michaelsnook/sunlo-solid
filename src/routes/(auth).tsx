import { useLocation, useNavigate } from '@solidjs/router'
import { useAuth } from 'auth-state-provider'
import { createEffect, ParentProps } from 'solid-js'

export default function AuthLayout(props: ParentProps) {
	const { getUid } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	createEffect(() => {
		// uid is null till initialized, then empty string means not logged in
		if (getUid() === '')
			navigate(`/login?redirectedFrom=${location.pathname}`, { replace: true })
	})
	return props.children
}
