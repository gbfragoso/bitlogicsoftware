<script lang="ts">
	import { enhance } from '$app/forms';
	import Notification from '$lib/components/Notification.svelte';
	import type { ActionData, PageServerData } from './$types';
	interface Props {
		data: PageServerData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
	let loading = $state(false);
	let { service } = $derived(data);
</script>

<div class="mb-2 ml-1">
	<nav id="breadcrumb" class="breadcrumb m-0" aria-label="breadcrumbs">
		<ul>
			<li><a href="/web">Página Inicial</a></li>
			<li class="is-active">
				<a href="/web/services" aria-current="page">Serviços</a>
			</li>
		</ul>
	</nav>
	<h1 class="is-size-3 has-text-weight-semibold">Editar de serviços</h1>
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
			<label class="label" for="nome">Nome do serviço</label>
			<div class="control">
				<input
					class="input"
					type="text"
					name="name"
					id="name"
					value={service.name}
					placeholder="Digite o nome do serviço"
					required
				/>
			</div>
			{#if form?.field === 'nome'}
				<p class="help is-danger">{form?.message}</p>
			{/if}
		</div>
		<div class="field">
			<label class="label" for="nome">Descrição</label>
			<div class="control">
				<input
					class="input"
					type="text"
					name="description"
					id="description"
					value={service.description}
					placeholder="Digite a descrição do serviço"
					required
				/>
			</div>
			{#if form?.field === 'nome'}
				<p class="help is-danger">{form?.message}</p>
			{/if}
		</div>
		<div class="field">
			<label class="label" for="nome">Valor em dinheiro</label>
			<div class="control">
				<input
					class="input"
					type="number"
					name="cash"
					id="cash"
					value={service.cash}
					placeholder="Digite o valor em dinheiro"
					required
				/>
			</div>
			{#if form?.field === 'nome'}
				<p class="help is-danger">{form?.message}</p>
			{/if}
		</div>
		<div class="field">
			<label class="label" for="nome">Valor no cartão</label>
			<div class="control">
				<input
					class="input"
					type="number"
					name="creditcard"
					id="creditcard"
					value={service.creditcard}
					placeholder="Digite o valor no cartão de crédito"
					required
				/>
			</div>
			{#if form?.field === 'nome'}
				<p class="help is-danger">{form?.message}</p>
			{/if}
		</div>
		<div class="field">
			<label class="label" for="nome">Duração estimada da sessão (em minutos)</label>
			<div class="control">
				<input
					class="input"
					type="number"
					name="duration"
					id="duration"
					value={service.duration}
					placeholder="Duração da sessão em minutos"
					required
				/>
			</div>
			{#if form?.field === 'nome'}
				<p class="help is-danger">{form?.message}</p>
			{/if}
		</div>
		<div class="control">
			<button
				aria-busy={loading}
				class:is-loading={loading}
				class="button is-primary has-text-weight-semibold"
				type="submit">Atualizar</button
			>
		</div>
	</div>
</form>

{#if form?.status === 200}
	<Notification class="is-success">Serviço atualizado com sucesso</Notification>
{/if}
