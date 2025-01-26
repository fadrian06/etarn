import restore from "@/database/restore";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect }) => {
	await restore();

	return redirect("/ingresar");
};
