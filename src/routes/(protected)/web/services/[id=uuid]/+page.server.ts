import { db } from '$lib/database/connection';
import { services } from '$lib/database/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.authorized) redirect(302, '/');

	try {
		const resultado = await db
			.select({
				id: services.id,
				name: services.name,
				description: services.description,
				cash: services.cash,
				creditcard: services.creditcard,
				duration: services.duration
			})
			.from(services)
			.where(eq(services.id, params.id));
		if (!resultado) {
			throw fail(404, { message: 'Serviço não encontrado' });
		}

		return { service: resultado[0] };
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao recuperar os dados do serviço'
		});
	}
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const name = form.get('name') as string;
		const description = form.get('description') as string;
		const cash = form.get('cash') as string;
		const creditcard = form.get('creditcard') as string;
		const duration = form.get('duration') as string;

		if (!name) {
			return {
				status: 400,
				field: 'nome',
				message: 'Nome do serviço é obrigatório'
			};
		}

		try {
			await db
				.update(services)
				.set({
					name,
					description,
					cash,
					creditcard,
					duration: duration ? parseInt(duration) : undefined
				})
				.where(eq(services.id, params.id));

			return { status: 200 };
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao atualizar o serviço'
			});
		}
	}
} satisfies Actions;
