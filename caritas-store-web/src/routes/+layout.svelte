<script>
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$currentUser) {
			goto("/login")
		}
	}) 
</script>

<div class="container">
	<div class="row">
		<div class="col">
			<slot />
		</div>
	</div>
</div>
