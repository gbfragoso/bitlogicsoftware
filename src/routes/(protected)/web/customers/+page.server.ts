import { db } from '$lib/database/connection';
import { ulike, unaccent } from '$lib/database/functions';
import { customers } from '$lib/database/schema';
import { error, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.authorized) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const nome = form.get('nome') as string;
		const where = nome ? ulike(customers.name, nome + '%') : undefined;

		try {
			const resultados = await db
				.select()
				.from(customers)
				.where(where)
				.orderBy(unaccent(customers.name))
				.limit(50);
			return { resultados };
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao carregar a lista de pacientes'
			});
		}
	}
} satisfies Actions;
