import type { APIRoute } from 'astro'
import db from '@/database/db'
import { hash } from 'bcrypt'

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData()

  db.prepare('insert into users (id, email, password) values ($id, $email, $password)', {
    $id: crypto.randomUUID(),
    $email: formData.get('email'),
    $password: await hash(formData.get('password')?.toString() || '', 10)
  }).run()

  return new Response('')
}
