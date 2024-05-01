import { getData } from '$lib/utils'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'
import jwt from 'jsonwebtoken'

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const id = url.searchParams.get('id') || ''
  return { id }
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  verify: async ({ cookies, request }) => {
    const { ID, PIN } = Object.fromEntries(await request.formData())

    if (!ID) return fail(400, { error: 'No ID is provided!' })

    if (!PIN) return fail(400, { error: 'No PIN is provided!' })

    const data = (await getData(ID))

    if (!data.records || !data.records.length) {
      return fail(404, { error: 'Cannot find this student!' })
    }

    if ((data.records.at(0)?.fields as any)['Password'] != PIN) {
      return fail(404, { error: 'Incorrect PIN No.' })
    }

    const token = jwt.sign({ id: ID }, 'Tisqaad')

    cookies.set('tisqaadToken', token, {
      httpOnly: true,
      path: '/',
    })

    throw redirect(303, `/${ID}`)
  }
}