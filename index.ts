import { serve } from "std/http/server.ts";
import { $interface, $number, guard } from "succulent";

function doc(body: string) {
	return `
		<!doctype html>
		<html>
		<head>
		<title>Whimsicott</title>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet">
		<style>
			body {
				font-family: Outfit;
			}
		</style>
		</head>
		<body>
		I'm changing stuff!
		${body}
		</body>
		</html>
	`;
}

const puppiesThunk = Deno.readTextFile("./data.json").then(JSON.parse).then((
	data,
) => data.puppies);

const $PuppiesRequestBody = $interface({
	count: $number.that((n) => n <= puppies.length),
});

async function handler(req: Request): Promise<Response> {
	const url = new URL(req.url);
	const puppies = await puppiesThunk;

	if (url.pathname === "/api/puppies") {
		try {
			const body = await req.json();
			guard(body, $PuppiesRequestBody);
			return new Response(JSON.stringify(puppies.slice(0, body.count)));
		} catch {
			return new Response("Error", { status: 500 });
		}
	}

	if (url.pathname === "/favicon.ico") {
		return new Response("404 Not Found", { status: 404 });
	}

	if (url.pathname !== "/hi") {
		return new Response("302 Redirect", {
			status: 302,
			headers: { location: "/hi" },
		});
	}

	let list = puppies.map((name) => `${name} is cute!`);

	return new Response(
		doc("Hi friend! Beep boop :)<br />" + list.join("<br />")),
		{
			headers: { "content-type": "text/html" },
		},
	);
}

console.log("Listening on http://localhost:8000");
await serve(async (req: Request) => {
	console.log("%c => ", "color: green", req.url);
	const res = await handler(req);
	console.log("%c <= ", "color: magenta", res.status);
	return res;
});
