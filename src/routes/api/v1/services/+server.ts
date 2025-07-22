import { db } from '$lib/database/connection';
import { professionals, services, users, serviceHasProfessional } from '$lib/database/schema';
import { error, json } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
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
			.select({
				id: services.id,
				service: services.name,
				description: services.description,
				professional: {
					id: professionals.id,
					name: professionals.name
				},
				price: {
					cash: services.cash,
					creditcard: services.creditcard
				}
			})
			.from(services)
			.leftJoin(serviceHasProfessional, eq(services.id, serviceHasProfessional.service))
			.leftJoin(professionals, eq(professionals.id, serviceHasProfessional.professional))
			.where(eq(services.userId, user[0]?.id))
			.orderBy(professionals.name, services.name);

		const map = new Map();
		for (const result of results) {
			if (map.has(result.id)) {
				map.get(result.id).professionals.push(result.professional);
			} else {
				map.set(result.id, {
					id: result.id,
					service: result.service,
					description: result.description,
					price: result.price,
					professionals: [result.professional]
				});
			}
		}

		return json(Array.from(map.values()));
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de serviços'
		});
	}
};
