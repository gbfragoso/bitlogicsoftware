<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
	let loading = $state(false);
</script>

<div class="mb-2">
	<nav id="breadcrumb" class="breadcrumb m-0" aria-label="breadcrumbs">
		<ul>
			<li><a href="/web">Página Inicial</a></li>
			<li class="is-active">
				<a href="/web/services" aria-current="page">Serviços</a>
			</li>
		</ul>
	</nav>
	<h1 class="is-size-3 has-text-weight-semibold">Consulta de serviços</h1>
</div>

<form
	class="card"
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
		<div class="field">
			<label class="label" for="nome">Nome do service</label>
			<div class="control">
				<input
					class="input"
					type="text"
					name="nome"
					id="nome"
					placeholder="Digite o nome do service"
				/>
			</div>
		</div>
		<div class="columns">
			<div class="column is-full-mobile is-2-tablet" style="min-width: 200px">
				<button
					aria-busy={loading}
					class:is-loading={loading}
					class="button is-primary is-fullwidth has-text-weight-semibold"
					type="submit"
				>
					<i class="fa-solid fa-magnifying-glass fa-fw">&nbsp;</i>Pesquisar
				</button>
			</div>
			<div class="column is-full-mobile is-2-tablet" style="min-width: 200px">
				<a class="button is-light is-fullwidth has-text-weight-semibold" href="/web/services/novo"
					><i class="fa-solid fa-plus fa-fw">&nbsp;</i>Novo</a
				>
			</div>
		</div>
	</div>
</form>

{#if form?.resultados}
	<div class="card">
		<div class="card-content">
			<div class="table-container">
				<table class="table is-striped is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Serviço</th>
							<th>Valor</th>
							<th>PIX</th>
							<th>Profissional</th>
							<th class="table-actions">Ações</th>
						</tr>
					</thead>
					<tbody>
						{#each form.resultados as service}
							<tr>
								<td>{service.name}</td>
								<td>{service.price}</td>
								<td>{service.pix}</td>
								<td>{service.professional}</td>
								<td class="table-actions">
									<a aria-label="link" href="/web/services/{service.id}">
										<Icon class="iconify" icon="lucide:square-pen" width="24" height="24"></Icon>
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}
