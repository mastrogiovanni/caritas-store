<script>
import { onMount } from "svelte";

	import RequestType from "./components/RequestType.svelte";
	import { allRequests, newRequest } from "./libs/apis.request";
    import * as moment from 'moment';

	let from;
	let to;
	let type;
	let notes;

	let adding = false;

	let requests = [];

	async function save() {
		adding = false;
		await newRequest({ from, to, type, notes });
		requests = await allRequests();
	}

	onMount(async () => {
		requests = await allRequests();
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
	{#each requests as request, i (request._id)}
		<a
			href="#!"
			class="list-group-item list-group-item-action active"
			aria-current={true}
		>
            {moment(new Date(request.from)).format("MMM Do")} 
            - 
            {moment(new Date(request.to)).format("MMM Do")}
            ({request.type})
            - {request.notes || ''}

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