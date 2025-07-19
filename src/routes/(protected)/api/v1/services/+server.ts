import { db } from '$lib/server/database/connection';
import { unaccent } from '$lib/server/database/functions';
import { services } from '$lib/server/database/schema';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import type { UUID } from 'crypto';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	const where = id ? eq(services.id, id) : undefined;
	const result = await db.select().from(services).where(where).orderBy(unaccent(services.name));
	return json(result);
};

export const POST: RequestHandler = async ({ request }) => {
	const { name, price, duration } = await request.json();

	try {
		const id = await db
			.insert(services)
			.values({
				name,
				price,
				duration: parseInt(duration),
				userId: '01981da5-d337-766f-86c0-630807c72cd0' as UUID,
				status: true
			})
			.returning({ id: services.id });
		return json({ id: id[0].id }, { status: 201 });
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao criar um novo serviço'
		});
	}
};
