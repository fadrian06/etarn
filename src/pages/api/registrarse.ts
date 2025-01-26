import type { APIRoute } from "astro";
import { hash } from "bcrypt";
import { saveUser } from "@/services/user";
import { capitalize } from "@/utils";
import { SESSION_QUERY_PARAM_NAME } from '@/configs';

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const id = crypto.randomUUID();

	await saveUser({
		id,
		name: capitalize(String(formData.get("name"))),
		email: String(formData.get("email")),
		password: await hash(String(formData.get("password")), 10),
		admin: true,
	});

	return redirect(`/app?${SESSION_QUERY_PARAM_NAME}=${id}`);
};
