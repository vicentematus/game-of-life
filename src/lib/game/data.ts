import { writable, type Writable } from 'svelte/store';

export const game: Writable<(0 | 1)[][]> = writable();
