import { db } from '$lib/database/connection';
import { error, redirect } from '@sveltejs/kit';
import { and, count, desc, gte, isNotNull, lte, sum } from 'drizzle-orm';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {};
