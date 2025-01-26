import { SESSION_QUERY_PARAM_NAME } from "@/configs";
import backup from "@/database/backup";
import type { User } from "@/types";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, redirect }) => {
	const { loggedUser } = locals as { loggedUser: User | null };

	await backup();

	return redirect(`/app?${SESSION_QUERY_PARAM_NAME}=${loggedUser?.id}`);
};
