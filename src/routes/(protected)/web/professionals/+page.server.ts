import { db } from '$lib/database/connection';
import { professionals } from '$lib/database/schema';
import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.authorized) redirect(302, '/');

	try {
		const results = async () => {
			return db.select().from(professionals).orderBy(professionals.name);
		};
		return { professionals: results() };
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de profissionais'
		});
	}
};
