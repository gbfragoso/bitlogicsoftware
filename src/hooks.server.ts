import { verify } from '$lib/auth/token';
import { db } from '$lib/database/connection';
import { sessions } from '$lib/database/schema';
import { eq } from 'drizzle-orm';

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get('sessionId');
	if (!sessionId) {
		event.locals.authorized = false;
		return resolve(event);
	}

	const result = await db
		.select({ token: sessions.token })
		.from(sessions)
		.where(eq(sessions.id, sessionId));

	if (!result || result.length === 0) {
		event.locals.authorized = false;
		return resolve(event);
	}

	const token = verify(result[0].token);
	if (!token) {
		event.locals.authorized = false;
		return resolve(event);
	}

	const tokenInfo = JSON.parse(token);
	event.cookies.set('sessionId', sessionId, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24,
		sameSite: 'strict'
	});

	event.locals.authorized = true;
	event.locals.type = tokenInfo.type;
	event.locals.role = tokenInfo.role;

	return resolve(event);
}
