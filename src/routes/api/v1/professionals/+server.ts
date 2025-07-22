import { db } from '$lib/database/connection';
import { professionalHasSpecialty, professionals, specialties, users } from '$lib/database/schema';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const apikey = request.headers.get('x-api-key');
	if (!apikey) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const user = await db.select({ id: users.id }).from(users).where(eq(users.apikey, apikey));
		if (user.length === 0) {
			return json({ message: 'Unauthorized' }, { status: 401 });
		}

		const results = await db
			.select({ id: professionals.id, name: professionals.name, specialties })
			.from(professionals)
			.leftJoin(
				professionalHasSpecialty,
				eq(professionals.id, professionalHasSpecialty.professional)
			)
			.leftJoin(specialties, eq(specialties.id, professionalHasSpecialty.specialty))
			.where(eq(professionals.userId, user[0]?.id))
			.orderBy(professionals.name);

		const map = new Map();
		for (const result of results) {
			if (map.has(result.id)) {
				map.get(result.id).specialties.push(result.specialties);
			} else {
				map.set(result.id, {
					id: result.id,
					name: result.name,
					specialties: [result.specialties]
				});
			}
		}

		return json(Array.from(map.values()));
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de profissionais'
		});
	}
};
