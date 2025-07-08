<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="columns is-desktop is-vcentered">
				<div class="column is-6 is-full-touch">
					<div class="signup-caption">
						<h1 class="title is-2 is-medium is-leading">Login</h1>
						<p>
							Seja bem vindo(a) a Bitlogic Software!<br />
						</p>
					</div>
					<form class="card p-6" style="max-width: 420px;">
						<div class="field pb-3">
							<label for="username">Usuário</label>
							<div class="control has-icons-left">
								<input name="username" type="text" class="input" placeholder="Insira seu usuário" />
								<span class="icon is-small is-left">
									<Icon class="iconify" icon="lucide:user"></Icon>
								</span>
							</div>
						</div>
						<div class="field pb-3">
							<label for="password">Senha</label>
							<div class="control has-icons-left">
								<input
									name="password"
									type="password"
									class="input"
									placeholder="Insira sua senha"
								/>
								<span class="icon is-small is-left">
									<Icon class="iconify" icon="lucide:lock"></Icon>
								</span>
							</div>
						</div>
						<div class="field">
							<button class="button is-primary is-fullwidth">Entrar</button>
						</div>
					</form>
				</div>
				<div class="is-hidden-touch column is-6">
					<img src="/bot.png" alt="Signup Illustration" />
				</div>
			</div>
		</div>
	</div>
</div>
