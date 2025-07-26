<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	interface Props {
		form: ActionData;
	}

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	dayjs.extend(utc);

	let { form }: Props = $props();
	let loading = $state(false);
</script>

<div class="mb-2 ml-1">
	<nav id="breadcrumb" class="breadcrumb m-0" aria-label="breadcrumbs">
		<ul>
			<li><a href="/web">Página Inicial</a></li>
			<li class="is-active">
				<a href="/web/customers" aria-current="page">Pacientes</a>
			</li>
		</ul>
	</nav>
	<h1 class="is-size-3 has-text-weight-semibold">Consulta de pacientes</h1>
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
			<label class="label" for="nome">Nome do paciente</label>
			<div class="control">
				<input
					class="input"
					type="text"
					name="nome"
					id="nome"
					placeholder="Digite o nome do paciente"
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
				<a
					class="button is-light is-fullwidth has-text-weight-semibold"
					href="/web/customers/register"><i class="fa-solid fa-plus fa-fw">&nbsp;</i>Novo</a
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
							<th>Nome</th>
							<th>Responsável</th>
							<th>Aniversário</th>
							<th class="table-actions">Ações</th>
						</tr>
					</thead>
					<tbody>
						{#each form.resultados as customer}
							<tr>
								<td>{customer.name}</td>
								<td>{customer.parent}</td>
								<td>{dayjs.utc(customer.birthday).format('DD/MM/YYYY')}</td>
								<td class="table-actions">
									<a aria-label="link" href="/web/customers/{customer.id}">
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
