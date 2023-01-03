<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Authentication failed</h1>
	{data.error}
</main>
