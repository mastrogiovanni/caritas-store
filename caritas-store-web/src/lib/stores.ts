import { writable } from 'svelte/store';

export const count = writable(0);

interface User {
    user: string;
    role: string;
    id: string;
}

export const currentUser = writable<User | null>(null);
