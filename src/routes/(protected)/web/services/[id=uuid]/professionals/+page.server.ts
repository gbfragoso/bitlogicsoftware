import { db } from '$lib/database/connection';
import { services, serviceHasProfessional, professionals } from '$lib/database/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.authorized) redirect(302, '/');

	try {
		const service = async () => {
			return db.select().from(services).where(eq(services.id, params.id));
		};
		const professional = async () => {
			return db.select().from(professionals).orderBy(professionals.name);
		};
		const servicesHasProfessional = async () => {
			return db
				.select({ id: professionals.id, name: professionals.name })
				.from(serviceHasProfessional)
				.innerJoin(professionals, eq(serviceHasProfessional.professional, professionals.id))
				.where(eq(serviceHasProfessional.service, params.id))
				.orderBy(professionals.name);
		};

		return {
			services: service(),
			servicesHasProfessional: servicesHasProfessional(),
			professionals: professional(),
			role: locals.role
		};
	} catch (err) {
		console.error(err);
		return error(500, {
			message: 'Falha ao carregar a lista de serviços'
		});
	}
};

export const actions: Actions = {
	adicionar: async ({ request, params }) => {
		const form = await request.formData();
		const service = params.id;
		const professional = form.get('professional') as string;

		try {
			await db.insert(serviceHasProfessional).values({ professional, service });
			return { status: 201 };
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao criar um novo professional'
			});
		}
	},
	excluir: async ({ url, params }) => {
		const service = params.id;
		const professional = url.searchParams.get('professional');
		if (!professional) {
			return fail(400, {
				message: 'Nenhum profissional foi selecionada para exclusão'
			});
		}

		try {
			await db
				.delete(serviceHasProfessional)
				.where(
					and(
						eq(serviceHasProfessional.service, service),
						eq(serviceHasProfessional.professional, professional)
					)
				);
			return { status: 200 };
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao excluir o professional'
			});
		}
	}
};
