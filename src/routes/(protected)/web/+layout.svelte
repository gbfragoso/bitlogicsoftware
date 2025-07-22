<script lang="ts">
	import Icon from '@iconify/svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/state';
	import type { LayoutServerData } from './$types';
	interface Props {
		data: LayoutServerData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	let { isAdmin, username, type } = $derived(data);
</script>

<main class="is-flex">
	<nav
		id="sidebar"
		class="is-flex is-flex-direction-column is-justify-content-space-between is-hidden-touch"
		style="max-width: 250px; min-width: 250px; width: 250px;"
	>
		<div class="p-3">
			<div class="mb-5 is-flex is-2 is-justify-content-center">
				<img src="/logo.png" id="user-avatar" alt="Avatar" />
			</div>
			<ul id="sidebar-list" class="is-flex is-flex-direction-column is-align-content-flex-start">
				<li class="sidebar-item" class:active={page.url.pathname === '/web'}>
					<a aria-label="home" title="Página inicial" href="/web">
						<Icon class="iconify" icon="lucide:layout-dashboard" width="24" height="24"
						></Icon>&nbsp; Dashboard
					</a>
				</li>
				{#if type.includes('clinic')}
					<li class="sidebar-item" class:active={page.url.pathname === '/web/events'}>
						<a aria-label="agendamentos" title="agendamentos" href="/web/events">
							<Icon class="iconify" icon="lucide:calendar-clock" width="24" height="24"
							></Icon>&nbsp; Agendamentos
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/customers'}>
						<a aria-label="pacientes" title="pacientes" href="/web/customer">
							<Icon class="iconify" icon="lucide:book-user" width="24" height="24"></Icon>&nbsp;
							Pacientes
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/professionals'}>
						<a aria-label="profissionais" title="profissionais" href="/web/professionals">
							<Icon class="iconify" icon="lucide:users" width="24" height="24"></Icon>&nbsp;
							Profissionais
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/services'}>
						<a aria-label="servicos" title="servicos" href="/web/services">
							<Icon class="iconify" icon="lucide:hand-platter" width="24" height="24"></Icon>&nbsp;
							Serviços
						</a>
					</li>
				{/if}
				{#if type.includes('sales')}
					<li class="sidebar-item" class:active={page.url.pathname === '/web/clientes'}>
						<a aria-label="clientes" title="clientes" href="/web/clientes">
							<Icon class="iconify" icon="lucide:users" width="24" height="24"></Icon>&nbsp;
							Clientes
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/estoque'}>
						<a aria-label="estoque" title="estoque" href="/web/estoque">
							<Icon class="iconify" icon="lucide:list-check" width="24" height="24"></Icon>&nbsp;
							Estoque
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/pedidos'}>
						<a aria-label="pedidos" title="pedidos" href="/web/pedidos">
							<Icon class="iconify" icon="lucide:clipboard-list" width="24" height="24"
							></Icon>&nbsp; Pedidos
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/produtos'}>
						<a aria-label="produtos" title="produtos" href="/web/produtos">
							<Icon class="iconify" icon="lucide:package" width="24" height="24"></Icon>&nbsp;
							Produtos
						</a>
					</li>
					<li class="sidebar-item" class:active={page.url.pathname === '/web/promocoes'}>
						<a aria-label="promocoes" title="promocoes" href="/web/promocoes">
							<Icon class="iconify" icon="lucide:badge-percent" width="24" height="24"></Icon>&nbsp;
							Promoções
						</a>
					</li>
				{/if}
			</ul>
		</div>
	</nav>
	<section class="section pt-0 is-flex-grow-1">
		<Navbar username="Gustavo Fragoso" userid="1"></Navbar>
		{@render children?.()}
	</section>
</main>
