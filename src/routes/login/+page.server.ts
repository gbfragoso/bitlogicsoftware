import { JWT_SECRET } from '$env/static/private';
import { db } from '$lib/database/connection';
import { users, sessions } from '$lib/database/schema';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!username || typeof username !== 'string') {
			return fail(400, { failedLogin: true });
		}

		if (!password || typeof password !== 'string' || password.length > 255) {
			return fail(400, { failedLogin: true });
		}

		try {
			const result = await db.select().from(users).where(eq(users.username, username));
			if (result.length === 0) {
				return fail(401, { failedLogin: true });
			}

			const user = result[0];
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return fail(401, { failedLogin: true });
			}

			await db.delete(sessions).where(eq(sessions.userId, user.id));

			const token = jwt.sign({ type: user.type, role: user.role }, JWT_SECRET!, {
				expiresIn: '1h'
			});

			const session = await db
				.insert(sessions)
				.values({
					userId: user.id,
					token
				})
				.returning({ id: sessions.id });

			cookies.set('sessionId', session[0].id, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24,
				sameSite: 'strict'
			});
		} catch (err) {
			console.error(err);
			return fail(500, {
				message: 'An error occurred during authentication'
			});
		}

		redirect(302, '/web');
	}
} satisfies Actions;
