<script lang="ts">
	import { ALIVE, DEAD, DEBUG_NUMBER, game } from '$lib/game/data';
	import { onMount, tick } from 'svelte';
	import Cell from './Cell.svelte';

	export let rows: number;
	export let columns: number;

	let mouse_down = false;
	let mouse_on_grid = false;

	function out_ouf_bounds(x: number, y: number) {
		return x < 0 || x >= rows || y < 0 || y >= columns;
	}

	function check_neighbors(x: number, y: number) {
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
			console.log(neighbor);
			// debugger;
			const [x, y] = neighbor;

			if (out_ouf_bounds(x, y)) {
				return;
			}

			console.log(x, y);
			// debugger;

			return is_alive(x, y) ? count++ : null;
		});
		console.log('estas viendo la posicion ', x, y);
		console.log('la cantidad de neighbors es ', count);

		return { neighbors: count };
		// debugger;
	}

	function is_alive(x: number, y: number) {
		const cell = $game[x][y];
		if (cell === DEBUG_NUMBER) {
			console.error('es una celda de tipo DEBUG');
			return false;
		} else if (cell === ALIVE) {
			console.log('ALIVE CELL');
			return true;
		} else {
			console.log('DEAD CELL');
			return false;
		}
	}

	function check_cells() {
		console.log('check cells');
		$game.forEach((row, rowIndex) => {
			row.forEach((cell, columnIndex) => {
				console.log(rowIndex, columnIndex);
				const currentCell = $game[rowIndex][columnIndex];
				console.log({ currentCell });
				// debugger
				const { neighbors } = check_neighbors(rowIndex, columnIndex);

				if (currentCell === ALIVE) {
					if (neighbors < 2) {
						$game[rowIndex][columnIndex] = DEAD;
					} else if (neighbors > 3) {
						$game[rowIndex][columnIndex] = DEAD;
					}
				} else {
					if (neighbors === 3) {
						$game[rowIndex][columnIndex] = ALIVE;
					}
				}

				// debugger;
			});
		});
	}

	function update_state() {
		console.log('update state');
		check_cells();
	}
	onMount(() => {
		const interval = setInterval(() => {
			update_state();
			tick();
			debugger;
			console.log('tick');
		}, 1000);

		return () => clearInterval(interval);
	});

	// run a timer to update the game
</script>

{#each Array(rows).fill(null) as _, rowIndex}
	<div class="flex">
		{#each Array(columns).fill(null) as _, columnIndex}
			<Cell {rowIndex} {columnIndex}></Cell>
		{/each}
	</div>
{/each}
