<script>
	import { onMount } from "svelte";
	import RequestType from "$lib/components/RequestType.svelte";
	import { allRequests, newRequest } from "$lib/apis.request";
    import moment from 'moment';

	/**
	 * @type {any[]}
	 */
	let requests = [];

	let adding = false;

	/**
	 * @type {undefined}
	 */
	let from = undefined;
	/**
	 * @type {undefined}
	 */
	 let to = undefined;
	/**
	 * @type {undefined}
	 */
	 let type = undefined;
	/**
	 * @type {undefined}
	 */
	 let notes = undefined;

	async function _loadRequests() {
		requests = await allRequests();
	}

	async function save() {
		adding = false;
		await newRequest({ 
			from, 
			to, 
			type, 
			notes 
		});
		from = undefined;
		to = undefined;
		type = undefined;
		notes = undefined;
		await _loadRequests();
	}

	onMount(async () => {
		await _loadRequests();
	}) 
</script>

<h1>Ordini</h1>

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

<div class="list-group">
	{#each requests as request (request._id)}
		<a
			href="#!"
			class="list-group-item list-group-item-action active"
			aria-current={true}
		>
            {request?.from ? moment(new Date(request.from)).format("MMM Do") : ""} 
            - 
            {request?.to ? moment(new Date(request.to)).format("MMM Do") : ""}
            ({request.type})
            - 
			{request.notes || ''}

		</a>
	{/each}
</div>

{#if adding}

<h1>Nuova Richiesta Ordini</h1>

<form>
	<div class="mb-3">
		<label for="price" class="form-label">Nome</label>
		<input
			bind:value={notes}
			type="text"
			class="form-control"
			id="notes"
			aria-describedby="notesHelp"
		/>
		<div id="notesHelp" class="form-text">Nome</div>
	</div>
	<div class="mb-3">
		<label for="from" class="form-label">Da</label>
		<input bind:value={from} type="date" class="form-control" id="from" aria-describedby="fromHelp" />
		<div id="fromHelp" class="form-text">Data di partenza</div>
	</div>
	<div class="mb-3">
		<label for="to" class="form-label">A</label>
		<input bind:value={to} type="date" class="form-control" id="to" aria-describedby="toHelp" />
		<div id="toHelp" class="form-text">Data di chiusura ordine</div>
	</div>
	<div class="mb-3">
		<RequestType id="type" bind:value={type} />
	</div>

	<button on:click|preventDefault={save} class="btn btn-primary">Aggiungi</button>

	<button
		on:click|preventDefault={() => {
			adding = false;
			notes = undefined;
			from = undefined;
			to = undefined;
			type = undefined;
		}}
		type="submit"
		class="btn btn-secondary">Cancella</button
	>

</form>

{/if}