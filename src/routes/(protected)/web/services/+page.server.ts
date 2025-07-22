import { db } from '$lib/database/connection';
import { ulike, unaccent } from '$lib/database/functions';
import { professionals, services } from '$lib/database/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.authorized) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const nome = form.get('nome') as string;
		const where = nome ? ulike(services.name, nome + '%') : undefined;

		try {
			const resultados = await db
				.select({
					id: services.id,
					name: services.name,
					price: services.price,
					pix: services.pix,
					professional: professionals.name
				})
				.from(services)
				.innerJoin(professionals, eq(professionals.id, services.professionalId))
				.where(where)
				.orderBy(unaccent(services.name))
				.limit(50);
			return { resultados };
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao carregar a lista de serviços oferecidos'
			});
		}
	}
} satisfies Actions;
