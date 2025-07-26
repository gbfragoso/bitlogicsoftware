<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();
	let { professionals } = $derived(data);
</script>

<div class="mb-2 ml-1">
	<nav id="breadcrumb" class="breadcrumb m-0" aria-label="breadcrumbs">
		<ul>
			<li><a href="/web">Página Inicial</a></li>
			<li class="is-active">
				<a href="/web/professional" aria-current="page">Profissionais</a>
			</li>
		</ul>
	</nav>
	<h1 class="is-size-4 has-text-weight-semibold mt-2">Minha equipe</h1>
</div>

<div class="card">
	<div class="card-content">
		<div class="table-container">
			<table class="table is-striped is-hoverable is-fullwidth">
				<thead>
					<tr>
						<th>Nome</th>
						<th class="table-actions">Ações</th>
					</tr>
				</thead>
				<tbody>
					{#await professionals}
						<tr>
							<td>
								<div class="skeleton-lines"><div></div></div>
							</td>
							<td>
								<div class="skeleton-lines"><div></div></div>
							</td>
						</tr>
					{:then item}
						{#each item as professional}
							<tr>
								<td>{professional.name}</td>
								<td class="table-actions">
									<a aria-label="link" href="/professionals/{professional.id}">
										<Icon class="iconify" icon="lucide:square-pen" width="24" height="24"></Icon>
									</a>
								</td>
							</tr>
						{/each}
					{/await}
				</tbody>
			</table>
		</div>
	</div>
</div>
