import { test, expect, expectTypeOf } from 'vitest';

test('GET method should not be allowed', async () => {
	const response = await fetch('http://localhost:5173/api/v1/signin');
	expect(response.status).toBe(405);
});

test('Empty body should throw error', async () => {
	const response = await fetch('http://localhost:5173/api/v1/signin', {
		method: 'POST'
	});
	expect(response.status).toBe(500);
});

test('Wrong username and password should be unauthorized', async () => {
	const response = await fetch('http://localhost:5173/api/v1/signin', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: 'testuser',
			password: 'testpassword'
		})
	});
	expect(response.status).toBe(401);
});

test('Wrong password only should be unauthorized', async () => {
	const response = await fetch('http://localhost:5173/api/v1/signin', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: 'gbfragoso',
			password: 'testpassword'
		})
	});
	expect(response.status).toBe(401);
});

test('Correct username and password should be authorized and return token', async () => {
	const response = await fetch('http://localhost:5173/api/v1/signin', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: 'gbfragoso',
			password: '123456'
		})
	});

	expect(response.status).toBe(200);
	expect(response.headers.get('Content-Type')).toBe('application/json');

	const json = await response.json();
	expect(json.sessionId).toBeDefined();
});
