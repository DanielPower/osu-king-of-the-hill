<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { PUBLIC_ROOT_URL } from '$env/static/public';
	import type { PageData } from './$types';
	export let user: PageData['user'];
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			{#if user}
				<li>
					<a href={`${PUBLIC_ROOT_URL}/profile`}>
						{user.username}
						<avatar>
							<img alt="User's avatar" src={user.avatarUrl} />
						</avatar>
					</a>
				</li>
				<li>
					<form method="POST" action="/auth?/logout" use:enhance>
						<button>Logout</button>
					</form>
				</li>
			{:else}
				<li>
					<form method="POST" action="/auth?/login" use:enhance>
						<button>Login</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background: #5639ac;
	}

	nav {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a,
	nav button {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	nav button {
		background: none;
		border: none;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	avatar img {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
	}
</style>
