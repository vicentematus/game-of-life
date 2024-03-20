<script lang="ts">
	import P5, { type p5 } from 'p5-svelte';

	let width = 400;
	let height = 400;
	const sketch = (p5: p5) => {
		let width = 400;
		let height = 400;
		let board: number[][];
		let w: number = 20;
		let columns: number;
		let rows: number;
		let next: number[][];

		function init() {
			for (let i = 0; i < columns; i++) {
				for (let j = 0; j < rows; j++) {
					next[i][j] = p5.floor(p5.random(2));
				}
			}
		}

		function check_neighbors(x: number, y: number) {
			const up = [x, y - 1];
			const down = [x, y + 1];
			const left = [x - 1, y];
			const right = [x + 1, y];
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

		p5.setup = () => {
			p5.frameRate(10);
			p5.createCanvas(400, 400);

			// todo: agregar implementacion de height y width del contenedor
			// console.log('el objeto de windows es ',window)
			// console.log(window.innerHeight)
			// p5.floor(window.innerHeight)

			// lo infiere del canvas
			console.log(p5.width);

			columns = p5.floor(p5.width / w);
			rows = p5.floor(p5.height / w);

			board = new Array(columns);

			for (let i = 0; i < columns; ++i) {
				board[i] = new Array(rows);
			}

			next = new Array(columns);
			for (let i = 0; i < columns; i++) {
				next[i] = new Array(rows);
			}

			console.log({ board });
			init();

			console.log({ next });
		};

		p5.draw = () => {
			p5.background(255);
			for (let i = 0; i < columns; i++) {
				for (let j = 0; j < rows; j++) {
					if (next[i][j] == 1) {
						p5.fill('orange');
						// p5.rect(x, y, w-1, w-1);
					} else {
						p5.fill(255);
					}
					p5.stroke(0);
					p5.rect(i * w, j * w, w - 1, w - 1);
				}
			}
			// p5.ellipse(p5.width / 2, p5.height / 2, width, height);
		};

		p5.mouseClicked = () => {
			// width = p5.random(100);
			// height = p5.random(100);
		};
	};
</script>

<label>
	Width
	<input type="range" bind:value={width} min="100" max="1000" step="0.01" />
	{width}
</label>

<label>
	Height
	<input type="range" bind:value={height} min="100" max="1000" step="0.01" />
	{height}
</label>

<P5 {sketch} />
