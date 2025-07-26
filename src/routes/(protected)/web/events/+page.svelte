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
				<a href="/web/events" aria-current="page">Agendamentos</a>
			</li>
		</ul>
	</nav>
	<h1 class="is-size-3 has-text-weight-semibold">Consulta de agendamentos</h1>
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
		<div class="columns">
			<div class="column">
				<div class="field">
					<label class="label" for="titulo">Paciente</label>
					<div class="control">
						<input
							class="input"
							type="text"
							name="customer"
							id="customer"
							placeholder="Digite o nome do paciente"
						/>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<label class="label" for="titulo">Profissional</label>
					<div class="control">
						<input
							class="input"
							type="text"
							name="professional"
							id="professional"
							placeholder="Digite o nome do profissional"
						/>
					</div>
				</div>
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
				<a class="button is-light is-fullwidth has-text-weight-semibold" href="/web/events/register"
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
							<th>Profissional</th>
							<th>Status</th>
							<th>Início</th>
							<th>Fim</th>
							<th class="table-actions">Ações</th>
						</tr>
					</thead>
					<tbody>
						{#each form.resultados as event}
							<tr>
								<td>{event.service}</td>
								<td>{event.professional}</td>
								{#if event.status === 'scheduled'}
									<td><span class="tag is-warning">Agendado</span></td>
								{:else if event.status === 'cancelled'}
									<td><span class="tag is-warning">Cancelado</span></td>
								{:else if event.status === 'confirmed'}
									<td><span class="tag is-success">Confirmado</span></td>
								{:else}
									<td><span class="tag is-success">Concluído</span></td>
								{/if}
								<td>{dayjs.utc(event.start).format('DD/MM/YYYY HH:MM')}</td>
								<td>{dayjs.utc(event.end).format('DD/MM/YYYY HH:MM')}</td>
								<td class="table-actions">
									<a aria-label="link" href="/web/events/{event.id}">
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
