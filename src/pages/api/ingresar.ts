import { getUserByEmail } from '@/services/user'
import type { APIRoute } from 'astro'
import { compare } from 'bcrypt'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()
  const user = await getUserByEmail(formData.get('email')?.toString() || '')

  if (
    !(await compare(formData.get('password')?.toString() || '', user?.password || ''))
  ) {
    return redirect('/ingresar')
  }

  return redirect('/app')
}
