import { db } from '$lib/database/connection';
import { ulike } from '$lib/database/functions';
import { events, professionals, services } from '$lib/database/schema';
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
					service: services.name,
					professional: professionals.name,
					description: events.description,
					status: events.status,
					start: events.start,
					end: events.end
				})
				.from(events)
				.innerJoin(services, eq(services.id, events.serviceId))
				.innerJoin(professionals, eq(professionals.id, events.professionalId))
				.where(where)
				.orderBy(events.start)
				.limit(50);
			return { resultados };
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao carregar a lista de agendamentos'
			});
		}
	}
} satisfies Actions;
