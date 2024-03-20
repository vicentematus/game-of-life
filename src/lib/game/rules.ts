export function is_alive(x: number, y: number) {
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
		console.log(neighbor);
		// debugger;
		const [x, y] = neighbor;

		console.log(x, y);
		// debugger;

		return is_alive(x, y) ? count++ : null;
	});
	console.log('estas viendo la posicion ', x, y);
	console.log('la cantidad de neighbors es ', count);

	return { neighbors: count };
	// debugger;
}
