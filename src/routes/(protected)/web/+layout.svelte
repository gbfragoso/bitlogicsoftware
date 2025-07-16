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
	//let { isAdmin, username, userid } = $derived(data);
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
				<li class="sidebar-item" class:active={page.url.pathname === '/app'}>
					<a aria-label="home" title="Página inicial" href="/app">
						<Icon class="iconify" icon="lucide:layout-dashboard" width="24" height="24"
						></Icon>&nbsp; Dashboard
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/agendamentos'}>
					<a aria-label="agendamentos" title="agendamentos" href="/app/agendamentos">
						<Icon class="iconify" icon="lucide:calendar-clock" width="24" height="24"></Icon>&nbsp;
						Agendamentos
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/clientes'}>
					<a aria-label="clientes" title="clientes" href="/app/clientes">
						<Icon class="iconify" icon="lucide:users" width="24" height="24"></Icon>&nbsp; Clientes
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/estoque'}>
					<a aria-label="estoque" title="estoque" href="/app/estoque">
						<Icon class="iconify" icon="lucide:list-check" width="24" height="24"></Icon>&nbsp;
						Estoque
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/pedidos'}>
					<a aria-label="pedidos" title="pedidos" href="/app/pedidos">
						<Icon class="iconify" icon="lucide:clipboard-list" width="24" height="24"></Icon>&nbsp;
						Pedidos
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/produtos'}>
					<a aria-label="produtos" title="produtos" href="/app/produtos">
						<Icon class="iconify" icon="lucide:package" width="24" height="24"></Icon>&nbsp;
						Produtos
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/promocoes'}>
					<a aria-label="promocoes" title="promocoes" href="/app/promocoes">
						<Icon class="iconify" icon="lucide:badge-percent" width="24" height="24"></Icon>&nbsp;
						Promoções
					</a>
				</li>
				<li class="sidebar-item" class:active={page.url.pathname === '/app/promocoes'}>
					<a aria-label="promocoes" title="promocoes" href="/app/promocoes">
						<Icon class="iconify" icon="lucide:hand-platter" width="24" height="24"></Icon>&nbsp;
						Serviços
					</a>
				</li>
			</ul>
		</div>
	</nav>
	<section class="section is-flex-grow-1">
		<Navbar username="Gustavo Fragoso" userid="1"></Navbar>
		{@render children?.()}
	</section>
</main>
