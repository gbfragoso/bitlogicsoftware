import { db } from '$lib/database/connection';
import { customers, users } from '$lib/database/schema';
import { error, json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, url }) => {
	const apikey = request.headers.get('x-api-key');
	if (!apikey) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const user = await db.select({ id: users.id }).from(users).where(eq(users.apikey, apikey));
		if (user.length === 0) {
			return json({ message: 'Unauthorized' }, { status: 401 });
		}

		const phone = url.searchParams.get('phone') as string;
		if (!phone) {
			const results = await db
				.select()
				.from(customers)
				.where(and(eq(customers.userId, user[0]?.id), eq(customers.phone, phone)))
				.orderBy(customers.name);
			return json(results);
		}

		return json([]);
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de clientes'
		});
	}
};

export const POST: RequestHandler = async ({ request, url }) => {
	const apikey = request.headers.get('x-api-key');
	if (!apikey) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const user = await db.select({ id: users.id }).from(users).where(eq(users.apikey, apikey));
		if (user.length === 0) {
			return json({ message: 'Unauthorized' }, { status: 401 });
		}

		const { name, phone, address, email, birthday, parent, cpf } = await request.json();
		if (!name || !phone) {
			return json({ message: 'Name and phone are required' }, { status: 400 });
		}

		await db
			.insert(customers)
			.values({
				name: name as string,
				phone: phone as string,
				address: address as string | undefined,
				email: email as string | undefined,
				birthday: birthday as string | undefined,
				parent: parent as string | undefined,
				cpf: cpf as string | undefined,
				userId: user[0].id
			})
			.onConflictDoUpdate({
				target: customers.phone,
				set: {
					name,
					phone,
					address: address as string | undefined,
					email: email as string | undefined,
					birthday: birthday as string | undefined,
					parent: parent as string | undefined,
					cpf: cpf as string | undefined,
					userId: user[0].id
				}
			});

		return json({ message: 'Customer saved successfully' }, { status: 201 });
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de clientes'
		});
	}
};
