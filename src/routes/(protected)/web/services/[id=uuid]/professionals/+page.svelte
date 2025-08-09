<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();
	let loading = $state(false);
	let { professionals, servicesHasProfessional, services, role } = $derived(data);
</script>

<div class="mb-2">
	<nav class="breadcrumb m-0" aria-label="breadcrumbs">
		<ul>
			<li><a href="/web">Página Inicial</a></li>
			<li><a href="/web/services">Serviços</a></li>
			<li class="is-active">
				<a href="/web/services/professionals" aria-current="page">Profissionais</a>
			</li>
		</ul>
	</nav>
	<h1 class="is-size-3 has-text-weight-semibold has-text-primary">Consulta de profissionais</h1>
</div>

<form
	class="card"
	action="?/adicionar"
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<div class="card-content">
		{#await services then service}
			<div class="field">
				<label class="label" for="nome">Nome do serviço</label>
				<div class="control">
					<input class="input" type="text" name="name" id="name" value={service[0].name} disabled />
				</div>
			</div>
		{/await}
		<div class="field">
			<label class="label" for="nome">Profissionais</label>
			<div class="select is-fullwidth">
				<select name="professional" id="professional" required>
					<option></option>
					{#await professionals then item}
						{#each item as professional}
							<option value={professional.id}>{professional.name}</option>
						{/each}
					{/await}
				</select>
			</div>
		</div>
		<div class="control">
			<button
				aria-busy={loading}
				class:is-loading={loading}
				class="button is-primary has-text-weight-semibold"
				type="submit">Adicionar</button
			>
		</div>
	</div>
</form>
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
					{#await servicesHasProfessional}
						<tr>
							<td>
								<div class="skeleton-lines">
									<div></div>
								</div>
							</td>
							<td>
								<div class="skeleton-lines">
									<div></div>
								</div>
							</td>
						</tr>
					{:then item}
						{#each item as professional}
							<tr>
								<td>{professional.name}</td>
								<td>
									{#if role.includes('admin')}
										<div class="field is-grouped">
											<form
												action="?/excluir&professional={professional.id}"
												method="POST"
												use:enhance
											>
												<button aria-label="trash">
													<Icon class="iconify" icon="lucide:trash-2" width="24" height="24"></Icon>
												</button>
											</form>
										</div>
									{/if}
								</td>
							</tr>
						{/each}
					{/await}
				</tbody>
			</table>
		</div>
	</div>
</div>
