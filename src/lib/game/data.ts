import { writable, type Writable } from 'svelte/store';

export const ALIVE = 1;
type ALIVE = typeof ALIVE;

export const DEAD = 0;
type DEAD = typeof DEAD;

export const DEBUG_NUMBER = 2;
type DEBUG_NUMBER = typeof DEBUG_NUMBER;

export const game: Writable<(0 | 1 | DEBUG_NUMBER)[][]> = writable();

