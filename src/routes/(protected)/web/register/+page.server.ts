import { db } from '$lib/database/connection';
import { users } from '$lib/database/schema';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		const type = formData.get('type') as string;
		const role = formData.get('role') as string;

		if (!username || !password || !type || !role) {
			return fail(400, { message: 'Username and password are required' });
		}

		try {
			const result = await db.select().from(users).where(eq(users.username, username));
			if (result.length > 0) {
				return fail(409, { message: 'User already exists' });
			}

			bcrypt.hash(password, 10, async function (err, hash) {
				if (err) {
					return error(500, {
						message: err.message || 'Failed to hash password'
					});
				}
				const saltRounds = 10;
				const token = crypto.randomUUID();
				const apikey = await bcrypt.hash(token, saltRounds);
				await db.insert(users).values({ username, password: hash, name, type, role, apikey });
			});

			return { status: 201 };
		} catch (err) {
			return error(500, {
				message: 'Registration failed'
			});
		}
	}
} satisfies Actions;
