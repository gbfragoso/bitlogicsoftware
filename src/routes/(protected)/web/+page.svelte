<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import type { PageServerData } from './$types';
	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();
	//let { avisos, emprestimos, devolucoes } = $derived(data);
	dayjs.extend(utc);
</script>

<div class="mt-2 columns">
	<div class="column">
		<div class="box has-text-weight-semibold">
			<i class="fa-solid fa-arrow-right fa-fw">&nbsp;</i>Clientes
			<h2 class="is-size-3 has-text-primary">512</h2>
		</div>
	</div>
	<div class="column">
		<div class="box has-text-weight-semibold">
			<i class="fa-solid fa-arrow-left fa-fw">&nbsp;</i>Atendimentos
			<h2 class="is-size-3 has-text-warning">1980</h2>
		</div>
	</div>
	<div class="column">
		<div class="box has-text-weight-semibold">
			<i class="fa-solid fa-repeat fa-fw">&nbsp;</i>Vendas
			<h2 class="is-size-3 has-text-success">R$ 10.000</h2>
		</div>
	</div>
	<div class="column">
		<div class="box has-text-weight-semibold">
			<i class="fa-solid fa-repeat fa-fw">&nbsp;</i>Agendamentos
			<h2 class="is-size-3 has-text-danger">50</h2>
		</div>
	</div>
</div>
<p class="is-size-4 mb-4 has-text-weight-semibold">Mural de avisos</p>

<div class="skeleton-block"></div>
<div class="skeleton-block"></div>
<div class="skeleton-block"></div>
<div class="skeleton-block"></div>
<div class="skeleton-block"></div>
