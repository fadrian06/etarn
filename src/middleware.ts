import { getUserById } from "@/services/user";
import { defineMiddleware } from "astro:middleware";

const PUBLIC_URLS = Object.freeze(["ingresar", "registrarse", "api"]);

export const onRequest = defineMiddleware(async (context, next) => {
	for (const publicUrl of PUBLIC_URLS) {
		if (context.url.href.includes(publicUrl)) {
			return next();
		}
	}

	const id = new URL(context.url).searchParams.get("session");

	const loggedUser = await getUserById(String(id));

	if (!loggedUser) {
		return context.redirect("/ingresar");
	}

	context.locals.loggedUser = loggedUser;

	return next();
});
