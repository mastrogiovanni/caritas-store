<script>
	import Dropzone from 'svelte-file-dropzone';
	import { onMount } from 'svelte';
	import { deleteProduct, loadProducts, newProduct, setProductEnabled } from './libs/apis.products';
	import { slide, fade } from 'svelte/transition';
	import Retailers from './components/Retailers.svelte';
	import Retailer from './components/Retailer.svelte';
	import SvelteTable from 'svelte-table';
import Switch from './components/Switch.svelte';

	let products = [];
	let adding = false;
	let name = undefined;
	let description = undefined;
	let category = undefined;
	let retailer = undefined;
	let price = undefined;
	let unity = undefined;
	let orderType = undefined;

	async function _loadProducts() {
		products = await loadProducts();
	}

	async function _deleteProduct(id) {
		await deleteProduct(id);
		await _loadProducts();
	}

	async function _newProduct() {
		adding = false;
		await newProduct({
			name,
			description,
			category,
			retailer,
			price,
			unity,
			orderType
		});
		await _loadProducts();
	}

	onMount(async () => {
		await _loadProducts();
	});

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
		console.log(files.accepted);
	}

	/*
	// define some sample data...
	const rows = [
		{ id: 1, first_name: 'Marilyn', last_name: 'Monroe', pet: 'dog' },
		{ id: 2, first_name: 'Abraham', last_name: 'Lincoln', pet: 'dog' },
		{ id: 3, first_name: 'Mother', last_name: 'Teresa', pet: '' },
		{ id: 4, first_name: 'John F.', last_name: 'Kennedy', pet: 'dog' },
		{ id: 5, first_name: 'Martin Luther', last_name: 'King', pet: 'dog' },
		{ id: 6, first_name: 'Nelson', last_name: 'Mandela', pet: 'cat' },
		{ id: 7, first_name: 'Winston', last_name: 'Churchill', pet: 'cat' },
		{ id: 8, first_name: 'George', last_name: 'Soros', pet: 'bird' },
		{ id: 9, first_name: 'Bill', last_name: 'Gates', pet: 'cat' },
		{ id: 10, first_name: 'Muhammad', last_name: 'Ali', pet: 'dog' },
		{ id: 11, first_name: 'Mahatma', last_name: 'Gandhi', pet: 'bird' },
		{ id: 12, first_name: 'Margaret', last_name: 'Thatcher', pet: 'cat' },
		{ id: 13, first_name: 'Christopher', last_name: 'Columbus', pet: 'dog' },
		{ id: 14, first_name: 'Charles', last_name: 'Darwin', pet: 'dog' },
		{ id: 15, first_name: 'Elvis', last_name: 'Presley', pet: 'dog' },
		{ id: 16, first_name: 'Albert', last_name: 'Einstein', pet: 'dog' },
		{ id: 17, first_name: 'Paul', last_name: 'McCartney', pet: 'cat' },
		{ id: 18, first_name: 'Queen', last_name: 'Victoria', pet: 'dog' },
		{ id: 19, first_name: 'Pope', last_name: 'Francis', pet: 'cat' }
		// etc...
	];

	// define column configs
	const columns = [
		{
			key: 'id',
			title: 'ID',
			value: (v) => v.id,
			sortable: true,
			filterOptions: (rows) => {
				// generate groupings of 0-10, 10-20 etc...
				let nums = {};
				rows.forEach((row) => {
					let num = Math.floor(row.id / 10);
					if (nums[num] === undefined)
						nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
				});
				// fix order
				nums = Object.entries(nums)
					.sort()
					.reduce((o, [k, v]) => ((o[k] = v), o), {});
				return Object.values(nums);
			},
			filterValue: (v) => Math.floor(v.id / 10),
			headerClass: 'text-left'
		},
		{
			key: 'first_name',
			title: 'FIRST_NAME',
			value: (v) => v.first_name,
			sortable: true,
			filterOptions: (rows) => {
				// use first letter of first_name to generate filter
				let letrs = {};
				rows.forEach((row) => {
					let letr = row.first_name.charAt(0);
					if (letrs[letr] === undefined)
						letrs[letr] = {
							name: `${letr.toUpperCase()}`,
							value: letr.toLowerCase()
						};
				});
				// fix order
				letrs = Object.entries(letrs)
					.sort()
					.reduce((o, [k, v]) => ((o[k] = v), o), {});
				return Object.values(letrs);
			},
			filterValue: (v) => v.first_name.charAt(0).toLowerCase()
		},
		{
			key: 'last_name',
			title: 'LAST_NAME',
			value: (v) => v.last_name,
			sortable: true,
			filterOptions: (rows) => {
				// use first letter of last_name to generate filter
				let letrs = {};
				rows.forEach((row) => {
					let letr = row.last_name.charAt(0);
					if (letrs[letr] === undefined)
						letrs[letr] = {
							name: `${letr.toUpperCase()}`,
							value: letr.toLowerCase()
						};
				});
				// fix order
				letrs = Object.entries(letrs)
					.sort()
					.reduce((o, [k, v]) => ((o[k] = v), o), {});
				return Object.values(letrs);
			},
			filterValue: (v) => v.last_name.charAt(0).toLowerCase()
		},
		{
			key: 'pet',
			title: 'Pet',
			value: (v) => v.pet,
			renderValue: (v) => v.pet.charAt(0).toUpperCase() + v.pet.substring(1), // capitalize
			sortable: true,
			filterOptions: ['bird', 'cat', 'dog'] // provide array
		}
	];
	*/

	async function enableProduct(id, enabled) {
		let product = products.find((item) => item._id === id)
		if (product) {
			await setProductEnabled(id, enabled);
			product.disabled = (enabled === "true" ? "false" : "true");
			product = product;
			products = products
		}
	}
</script>

<!--
<SvelteTable columns="{columns}" rows="{rows}"></SvelteTable>
-->

<h1>Products</h1>

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

<!--accept="text/csv"-->
{#if adding}

	<!--
	<h1>Upload CSV file and preview same</h1>

	<Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv">
		{#if files.accepted?.length > 0}
			<ol>
				{#each files.accepted as item}
					<li>{item.name}</li>
				{/each}
			</ol>
		{:else}
			<p>Upload CSV</p>
		{/if}
	</Dropzone>
	-->

	<form transition:slide>
		<div class="row">
			<div class="col">
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input
						bind:value={name}
						type="text"
						class="form-control"
						id="name"
						aria-describedby="nameHelp"
					/>
					<div id="nameHelp" class="form-text">Nome prodotto</div>
				</div>
				<div class="mb-3">
					<label for="description" class="form-label">Description</label>
					<input
						bind:value={description}
						type="text"
						class="form-control"
						id="description"
						aria-describedby="descriptionHelp"
					/>
					<div id="descriptionHelp" class="form-text">Breve descrizione.</div>
				</div>

				<div class="mb-3">
					<label for="category" class="form-label">Category</label>
					<input
						bind:value={category}
						type="text"
						class="form-control"
						id="category"
						aria-describedby="categoryHelp"
					/>
					<div id="categoryHelp" class="form-text">Categoria Merceologica</div>
				</div>
			</div>
			<div class="col">
				<div class="mb-3">
					<Retailers id="retailer" bind:value={retailer} />
				</div>

				<div class="mb-3">
					<label for="price" class="form-label">Prezzo</label>
					<input
						bind:value={price}
						type="text"
						class="form-control"
						id="price"
						aria-describedby="priceHelp"
					/>
					<div id="priceHelp" class="form-text">Prezzo</div>
				</div>

				<div class="mb-3">
					<label for="price" class="form-label">Unità</label>
					<input
						bind:value={unity}
						type="text"
						class="form-control"
						id="unity"
						aria-describedby="unityHelp"
					/>
					<div id="unityHelp" class="form-text">Unità di misura</div>
				</div>

				<div class="mb-3">
					<label for="orderTytpe" class="form-label">Tipo di Ordine</label>
					<select
						bind:value={orderType}
						id="orderTytpe"
						aria-describedby="orderTytpeHelp"
						class="form-select"
						aria-label="Tipo Ordine"
					>
						<option selected>-</option>
						<option value="weekly">Settimanale</option>
						<option value="monthly">Mensile</option>
						<option value="all">Entrambi</option>
					</select>
				</div>
			</div>
		</div>

		<button on:click|preventDefault={_newProduct} class="btn btn-primary">Aggiungi</button>
		<button
			on:click|preventDefault={() => {
				adding = false;
				name = undefined;
				description = undefined;
			}}
			type="submit"
			class="btn btn-secondary">Cancella</button
		>
	</form>
{/if}

<table class="table table-striped table-bordered">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th>Nome</th>
			<th>Descrizione</th>
			<th>Categoria</th>
			<th>Fornitore</th>
			<th>Prezzo Unitario</th>
			<th>Unità</th>
			<th>Tipo Ordine</th>
			<th>Abilitato</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each products as product (product._id)}
			<tr transition:fade>
				<th scope="row">{product._id}</th>
				<td>{product.name}</td>
				<td>{product.description}</td>
				<td>{product.category || ''}</td>
				<td><Retailer id={product.retailer} /></td>
				<td>{product.price || ''}</td>
				<td>{product.unity || ''}</td>
				<td>{product.orderType || ''}</td>
				<td>
					<div class="form-check form-switch">
						<input on:change={(event) => { enableProduct(product._id, event.target.checked) }} class="form-check-input" type="checkbox" id="enabled-{product._id}" checked={product.disabled === "false"}>
						<label class="form-check-label" for="enabled-{product._id}"></label>
					</div>
				</td>
				<td
					><button
						on:click|preventDefault={() => {
							_deleteProduct(product._id);
						}}
						class="btn btn-small btn-danger">Delete</button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
