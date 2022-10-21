<script>
    import { onMount } from "svelte";
	import { loadRetailers, newRetailer } from "./libs/apis.retailer";
	import { slide, fade } from 'svelte/transition';

    let retailers = []; 
	let adding = false;
	let name = undefined;

	async function _loadRetailers() {
		retailers = await loadRetailers() || [];
	}

	async function _newRetailer() {
		adding = false;
		await newRetailer(name);
		await _loadRetailers();
	}

    onMount(async () => {
		_loadRetailers();
    })
</script>

<h1>Fornitori</h1>

<div class="d-flex flex-row-reverse bd-highlight">
	<div class="p-2 bd-highlight">
        {#if !adding}
		<button
			on:click|preventDefault={() => {
				adding = !adding;
			}}
			class="btn btn-primary">Aggiungi</button
		>
        {/if}
	</div>
</div>

{#if adding}
	<form transition:slide>
		<div class="mb-3">
			<label for="name" class="form-label">Nome</label>
			<input
				bind:value={name}
				type="text"
				class="form-control"
				id="name"
				aria-describedby="nameHelp"
			/>
			<div id="nameHelp" class="form-text">Nome Fornitore</div>
		</div>
		<button on:click|preventDefault={_newRetailer} class="btn btn-primary">Aggiungi</button>
		<button on:click|preventDefault={() => { adding = false; name = undefined; }} type="submit" class="btn btn-secondary">Cancella</button>
	</form>
{/if}

<table class="table">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">Name</th>
		</tr>
	</thead>
	<tbody>
        {#each retailers as retailer (retailer._id)}
		<tr>
			<th scope="row">{retailer._id}</th>
			<td>{retailer.name}</td>
		</tr>
        {/each}
	</tbody>
</table>
