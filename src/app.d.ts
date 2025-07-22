declare global {
	namespace App {
		interface Locals {
			authorized: boolean;
			name: string;
			type: string;
			role: string;
		}
	}
}

export {};
