import type { Handle } from '@sveltejs/kit'
import { checkingServer } from '$lib/fire'

export const handle: Handle = async ({ event, resolve }) => {
  const server = await checkingServer()
  if (!server) return {}

  const response = await resolve(event)
  return response
}