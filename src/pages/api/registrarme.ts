import type { APIRoute } from 'astro'
import { hash } from 'bcrypt'
import { saveUser } from '@/services/user'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()

  await saveUser({
    id: crypto.randomUUID(),
    email: formData.get('email') as string,
    password: await hash(formData.get('password')?.toString() || '', 10),
    admin: true
  })

  return redirect('/app')
}
