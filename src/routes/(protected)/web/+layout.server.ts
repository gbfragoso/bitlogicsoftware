import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.authorized) {
		error(401, {
			message: 'Usuário não possui acesso ao sistema'
		});
	}

	return {
		username: locals.name,
		type: locals.type,
		isAdmin: locals.role.includes('admin')
	};
};
