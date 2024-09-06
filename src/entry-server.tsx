// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.png" />
					{assets}
				</head>
				<body class="min-h-screen w-full bg-[hsl(210,100,15)] text-white">
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
))
