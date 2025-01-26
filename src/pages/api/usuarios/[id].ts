import { deleteUserById, saveUser } from "@/services/user";
import { capitalize } from "@/utils";
import type { APIRoute } from "astro";
import { hashSync } from "bcrypt";

export const DELETE: APIRoute = ({ params: { id } }) => {
	deleteUserById(String(id));

	return new Response();
};

export const PUT: APIRoute = async ({ request, params: { id }, redirect }) => {
	const formData = await request.formData();

	await saveUser({
		name: capitalize(String(formData.get("name"))),
		admin: Boolean(formData.get("admin")),
		email: String(formData.get("email")),
		id: String(id),
		password: hashSync(String(formData.get("password")), 10),
		userId: String(formData.get("userId")),
	});

	return redirect("/usuarios");
};
