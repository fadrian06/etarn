import { getUserByEmail } from "@/services/user";
import type { APIRoute } from "astro";
import { compare } from "bcrypt";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const user = await getUserByEmail(String(formData.get("email")));

	if (
		!(await compare(String(formData.get("password")), String(user?.password)))
	) {
		return redirect("/ingresar");
	}

	return redirect(`/app?session=${user?.id}`);
};
