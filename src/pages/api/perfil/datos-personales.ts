import { SESSION_QUERY_PARAM_NAME } from '@/configs';
import { getUserById, saveUser } from "@/services/user";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const id = new URL(request.url).searchParams.get(SESSION_QUERY_PARAM_NAME);

	const loggedUser = await getUserById(String(id));

	if (!loggedUser) {
		return redirect("/ingresar");
	}

	await saveUser({
		id: String(id),
		name: String(`${formData.get("name")} ${formData.get("lastName")}`),
		email: String(formData.get("email")),
		password: loggedUser.password, // TODO
		admin: loggedUser.admin,
		phonePersonal: String(formData.get("phonePersonal")),
		phoneJob: String(formData.get("phoneJob")),
		phoneHome: String(formData.get("phoneHome")),
		userId: loggedUser.userId,
	});

	return redirect(`/app/perfil/configurar?${SESSION_QUERY_PARAM_NAME}=${loggedUser.id}`);
};
