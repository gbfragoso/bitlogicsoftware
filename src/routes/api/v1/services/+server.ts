import { db } from '$lib/database/connection';
import { professionals, services, users } from '$lib/database/schema';
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
			.select({
				id: services.id,
				service: services.name,
				description: services.description,
				professional: professionals.name,
				price: services.price,
				pix: services.pix
			})
			.from(services)
			.innerJoin(professionals, eq(professionals.id, services.professionalId))
			.where(eq(services.userId, user[0]?.id))
			.orderBy(professionals.name, services.name);

		return json(results);
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de serviços'
		});
	}
};
