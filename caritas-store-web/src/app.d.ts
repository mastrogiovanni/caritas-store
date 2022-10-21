/// <reference types="@sveltejs/kit" />

interface SessionData {
	username?: string;
	password?: string;
	name?: string;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {

    interface Locals {
		session: import('svelte-kit-cookie-session').Session<SessionData>;
	}

	interface Platform {}

	interface Session extends SessionData {}

	// interface PrivateEnv {}

	// interface PublicEnv {}
    
}
