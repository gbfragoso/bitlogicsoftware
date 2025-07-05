import { createAuthClient } from 'better-auth/svelte';
import { apiKeyClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	plugins: [apiKeyClient()]
});
