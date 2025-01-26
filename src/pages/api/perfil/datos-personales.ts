import { getUserById, saveUser } from "@/services/user";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const id = new URL(request.url).searchParams.get("session");

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

	return redirect(`/app/perfil/configurar?session=${loggedUser.id}`);
};
