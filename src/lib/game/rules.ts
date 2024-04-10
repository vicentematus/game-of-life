import { game, DEBUG_NUMBER, ALIVE, DEAD, store_rows, store_columns } from '$lib/game/data';
import { get } from 'svelte/store';

export function out_ouf_bounds(x: number, y: number) {
	return x < 0 || x >= get(store_rows) || y < 0 || y >= get(store_columns);
}

export function is_alive(x: number, y: number) {
	const board = get(game);
	// console.log({ board });

	const cell = board[x][y];
	// console.log({ cell });

	if (cell === DEBUG_NUMBER) {
		return false;
	} else if (cell === ALIVE) {
		return true;
	} else {
		return false;
	}
}

export function check_neighbors(x: number, y: number) {
	const up = [x, y - 1];
	const down = [x, y + 1];
	const left = [x - 1, y];
	const right = [x + 1, y];
	// ojo aca man puede ser que este mal
	const diagonal_up_left = [x - 1, y - 1];
	const diagonal_up_right = [x + 1, y - 1];
	const diagonal_down_left = [x - 1, y + 1];
	const diagonal_down_right = [x + 1, y + 1];

	const neighbors = [
		up,
		down,
		left,
		right,
		diagonal_up_left,
		diagonal_up_right,
		diagonal_down_left,
		diagonal_down_right
	];

	let count = 0;
	neighbors.forEach((neighbor) => {
		const [x, y] = neighbor;

		if (out_ouf_bounds(x, y)) {
			return;
		}

		return is_alive(x, y) ? count++ : null;
	});

	return count;
	// debugger;
}



export function is_game_valid() {
	const board = get(game);
	return board.some((row) => row.some((cell) => cell === ALIVE));
} 