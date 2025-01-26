import { getUserById } from "@/services/user";
import { defineMiddleware } from "astro:middleware";
import { SESSION_QUERY_PARAM_NAME } from "./configs";

const PUBLIC_URLS = Object.freeze(["ingresar", "registrarse", "api"]);

export const onRequest = defineMiddleware(async (context, next) => {
	for (const publicUrl of PUBLIC_URLS) {
		if (context.url.pathname.includes(publicUrl)) {
			return next();
		}
	}

	if (context.url.pathname === "/") {
		return next();
	}

	const id = new URL(context.url).searchParams.get(SESSION_QUERY_PARAM_NAME);

	const loggedUser = await getUserById(String(id));

	if (!loggedUser) {
		return context.redirect("/ingresar");
	}

	context.locals = { ...context.locals, loggedUser };

	return next();
});
