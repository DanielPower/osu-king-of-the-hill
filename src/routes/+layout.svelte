<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>Made by <a href="https://osu.ppy.sh/users/10624401">CrispyUmbrella</a></footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
	}

	main {
		padding: 1rem 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 1rem auto;
		background: var(--color-bg-1);
		border-radius: 1rem;
	}

	footer {
		margin: 0 auto;
	}

	footer a {
		font-weight: bold;
	}
</style>
