import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

function handler(req: Request): Response {
	const url = new URL(req.url);
	console.log(req.url);
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
await serve(handler);
