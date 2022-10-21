<script>
	import { loadUsers } from '../libs/apis.users';
	import { onMount } from 'svelte';

	export let onUser = (idTenant) => {};

	let users = [];
	let selected = -1;

	onMount(async () => {
		users = await loadUsers();
		if (users?.length > 0) {
			select(0);
		}
	});

	function select(index) {
		selected = index;
		onUser(users[selected]._id);
	}
</script>

<div class="list-group">
	{#each users as tenant, i (tenant._id)}
		<a
			on:click|preventDefault={() => select(i)}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
			{tenant.name}
		</a>
	{/each}
</div>
