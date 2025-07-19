import { test, expect, expectTypeOf } from 'vitest';

test('Returning 200', async () => {
	const response = await fetch('http://localhost:5173/api/v1/status');
	expect(response.status).toBe(200);
	expect(response.body).toBeInstanceOf(Array);
});

test('Returning 200', async () => {
	const response = await fetch('http://localhost:5173/api/v1/status?id=1');
	expect(response.status).toBe(200);
});
