import { writable, get, type Writable } from 'svelte/store';

export const DEAD = 0;
type DEAD = typeof DEAD;

export const ALIVE = 1;
type ALIVE = typeof ALIVE;

export const DEBUG_NUMBER = 2;
type DEBUG_NUMBER = typeof DEBUG_NUMBER;

export const store_rows: Writable<number> = writable(0);
export const store_columns: Writable<number> = writable(0);

export const game: Writable<(DEAD | ALIVE | DEBUG_NUMBER | number)[][]> = writable();
export const game_status = writable(true);

// recommended by p5.js game of life implementation to avoid stuttering.

export function restart_game() {
	const rows = get(store_rows);
	console.log('rows', rows);

	const columns = get(store_columns);
	console.log('columns', columns);

	// ojo con este error de tipo
	const empty_game = Array.from({ length: rows }, () =>
		Array.from({ length: columns }, () => DEAD)
	) as (DEAD | ALIVE | DEBUG_NUMBER)[][];

	console.log('me reinicie exitosamente');

	console.log(get(game));
	game.set(empty_game);
}

export function random_game() {
	const rows = get(store_rows);
	const columns = get(store_columns);

	const random_game = Array.from({ length: rows }, () =>
		Array.from({ length: columns }, () => (Math.random() > 0.5 ? ALIVE : DEAD))
	) as (DEAD | ALIVE | DEBUG_NUMBER)[][];

	console.log(random_game);

	game.set(random_game);
}
