import { getData } from '$lib/utils'
import { fail, type Actions, redirect } from '@sveltejs/kit'

export const config = {
  runtime: 'edge'
}

export function load() {
  return {}
}

export const actions: Actions = {
  search: async ({ request }) => {
    const id = (await request.formData()).get('id')

    if (!id || id.length <= 2) {
      return fail(400, { missing: true })
    }

    let data = await getData(id)

    if (!data.records || !data.records.length) {
      return fail(404, { notFound: true })
    }

    throw redirect(302, `/${id}`)
  }
}