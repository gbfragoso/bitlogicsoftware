import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export function verify(token: string): string {
	return JSON.stringify(jwt.verify(token, JWT_SECRET));
}

export function sign(type: string, role: string): string {
	return jwt.sign({ type, role }, JWT_SECRET, { expiresIn: '1h' });
}
