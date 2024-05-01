import { getData } from '$lib/utils'
import { redirect } from '@sveltejs/kit'
import { jwtVerify } from 'jose'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
  const { id } = params
  const token = cookies.get('tisqaadToken')

  if (!token) {
    throw redirect(302, `/verify?id=${id}`)
  }

  const secret = new TextEncoder().encode('Tisqaad')
  if (!secret) throw redirect(302, `/verify?id=${id}`)

  let decoded

  try {
    decoded = await jwtVerify(token, secret)
  } catch (error) {
    throw redirect(302, `/verify?id=${id}`)
  }

  if (!decoded || !decoded.payload.id) throw redirect(302, `/verify?id=${id}`)

  if (id !== decoded.payload.id) throw redirect(302, `/verify?id=${id}`)

  return (await getData(id))
}