<script>
	import Dropzone from 'svelte-file-dropzone';
	import { onMount } from 'svelte';
	import { deleteUser, loadUsers, newUser } from '$lib/apis.users';

	let users = [];

	let adding = false;

	let name = undefined;
	let username = undefined;
	let password = undefined;

	async function _loadUsers() {
		users = await loadUsers();
	}

	async function _deleteUser(id) {
		await deleteUser(id);
		await _loadUsers();
	}

	async function _newUser() {
		adding = false;
		await newUser({
			name,
			username,
			password
		});
		name = undefined;
		username = undefined;
		password = undefined;
		await _loadUsers();
	}

	onMount(async () => {
		await _loadUsers();
	});

</script>

<h1>Utenti</h1>

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

	<h1>Nuovo Utente</h1>

	<form>
		<div class="row">
			<div class="col">
				<div class="mb-3">
					<label for="name" class="form-label">Nome</label>
					<input
						bind:value={name}
						type="text"
						class="form-control"
						id="name"
						aria-describedby="nameHelp"
					/>
					<div id="nameHelp" class="form-text">Nome</div>
				</div>
			</div>
			<div class="col">
				<div class="mb-3">
					<label for="username" class="form-label">Username</label>
					<input
						bind:value={username}
						type="text"
						class="form-control"
						id="username"
						aria-describedby="usernameHelp"
					/>
					<div id="usernameHelp" class="form-text">Username</div>
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input
						bind:value={password}
						type="text"
						class="form-control"
						id="password"
						aria-describedby="passwordHelp"
					/>
					<div id="passwordHelp" class="form-text">Password utente</div>
				</div>
			</div>
		</div>

		<button on:click|preventDefault={_newUser} class="btn btn-primary">Aggiungi</button>
		<button
			on:click|preventDefault={() => {
				adding = false;
				name = undefined;
				password = undefined;
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
			<th>Password</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each users as user (user._id)}
			<tr>
				<th scope="row">{user._id}</th>
				<td>{user.name}</td>
				<td>{user.password}</td>
				<td
					><button
						on:click|preventDefault={() => {
							_deleteUser(user._id);
						}}
						class="btn btn-small btn-danger">Delete</button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
