import { serve } from "std/http/server.ts";
import { $interface, $number, guard } from "succulent";

const puppies = ["August", "Dot", "Mady", "Spot", "Toby"];

const $PuppiesRequestBody = $interface({
	count: $number.that((n) => n <= puppies.length),
});

async function handler(req: Request): Promise<Response> {
	const url = new URL(req.url);

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

	return new Response("Hi friend!", {
		headers: { "content-type": "text/html" },
	});
}

console.log("Listening on http://localhost:8000");
await serve(async (req: Request) => {
	console.log("%c => ", "color: green", req.url);
	const res = await handler(req);
	console.log("%c <= ", "color: magenta", res.status);
	return res;
});
