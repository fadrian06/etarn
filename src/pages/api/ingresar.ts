import type { APIRoute } from 'astro'

export const POST: APIRoute = ({ redirect }) => {
  return redirect('../app')
}
