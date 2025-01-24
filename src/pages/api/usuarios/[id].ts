import { deleteUserById, saveUser } from '@/services/user'
import type { APIRoute } from 'astro'
import { hashSync } from 'bcrypt'

export const DELETE: APIRoute = ({ params: { id } }) => {
  deleteUserById(id || '')

  return new Response()
}

export const PUT: APIRoute = async ({ request, params: { id }, redirect }) => {
  const formData = await request.formData()

  saveUser({
    admin: false,
    email: formData.get('email') as string,
    id: id as string,
    password: hashSync(formData.get('password') as string, 10)
  })

  return redirect('/usuarios')
}
