<script>
	import { onMount } from 'svelte';
	import { loadRetailers } from '$lib/apis.retailer';

	export let onRetailer = (idRetailer) => {};

	let retailers = [];
	let selected = -1;

	onMount(async () => {
		retailers = await loadRetailers();
		if (retailers?.length > 0) {
			select(0);
		}
	});

	function select(index) {
		selected = index;
		onRetailer(retailers[selected]._id);
	}
</script>

<div class="list-group">
	{#each retailers as retailer, i (retailer._id)}
		<a
			on:click|preventDefault={() => select(i)}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
			{retailer.name}
		</a>
	{/each}
</div>
