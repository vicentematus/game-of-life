<script lang="ts">
	import {
		game,
		restart_game,
		store_columns,
		store_rows,
		DEAD,
		ALIVE,
		DEBUG_NUMBER,
		random_game,
		game_status
	} from '$lib/game/data';
	import { check_neighbors, is_game_valid } from '$lib/game/rules';
	import { storeSketchControls, type SketchControls, fps } from '$lib/game/sketch';
	import P5, { type p5 } from 'p5-svelte';
	import Control from './Control.svelte';

	// recommended by p5.js game of life implementation to avoid stuttering
	let sketchFps = fps;
	let is_playing: boolean = true;

	let p5_instance: p5;
	// falta definir el tipo aca
	let sketchControls: SketchControls;

	const sketch = (p5: p5) => {
		p5_instance = p5;
		let board: number[][];
		let w: number = 20;
		let columns: number;
		let rows: number;
		let next: number[][];

		const width = window.innerWidth;
		const height = window.innerHeight;

		columns = Math.floor(width / w);
		rows = Math.floor(height / w);

		const matrix = Array.from({ length: rows }, () =>
			Array.from({ length: columns }, () => (Math.random() > 0.5 ? 1 : 0))
		);

		game.set(matrix);

		function init() {
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < columns; j++) {
					next[i][j] = p5.floor(p5.random(2));
				}
			}
		}

		p5.setup = () => {
			p5.frameRate($sketchFps);

			p5.createCanvas(Math.floor(p5.windowWidth), Math.floor(p5.windowHeight));

			columns = p5.floor(p5.width / w);
			rows = p5.floor(p5.height / w);

			store_columns.set(columns);
			store_rows.set(rows);

			board = new Array(rows);
			for (let i = 0; i < rows; i++) {
				board[i] = new Array(columns);
			}

			next = new Array(rows);
			for (let i = 0; i < rows; i++) {
				next[i] = new Array(columns);
			}

			init();

			game.set(next);
		};

		function paint() {
				for (let i = 0; i < rows; i++) {
					for (let j = 0; j < columns; j++) {
						if (next[i][j] == 1) {
							p5.fill('orange');
						} else {
							p5.fill(255);
						}

						p5.stroke(0);
						p5.rect(j * w, i * w, w - 1, w - 1);
					}
				}
		}


		function mousePressed() {
				let col = Math.floor(p5.mouseX / w);
				let row = Math.floor(p5.mouseY / w);

				if (col >= 0 && col < columns && row >= 0 && row < rows) {
					next[row][col] = 1;
					paint();
				}
			}

		p5.mousePressed = mousePressed

		p5.draw = () => {
			p5.background(255);

			function play() {
				for (let i = 0; i < rows; i++) {
					for (let j = 0; j < columns; j++) {
						let state = next[i][j];
						let neighbors = check_neighbors(i, j);

						if (state == 0 && neighbors == 3) {
							board[i][j] = 1;
						} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
							board[i][j] = 0;
						} else {
							board[i][j] = state;
						}
					}
				}

				let temp = next;
				next = board;
				board = temp;

				game.set(next);

				const is_valid = is_game_valid();
				if (is_valid === false) {
					p5.noLoop();
					game_status.set(is_valid);
				}
			}

			paint();
			play();
		};

		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

			columns = Math.floor(p5.width / w);
			rows = Math.floor(p5.height / w);

			store_columns.set(columns);
			store_rows.set(rows);

			board = new Array(rows);
			for (let i = 0; i < rows; i++) {
				board[i] = new Array(columns);
			}

			next = new Array(rows);
			for (let i = 0; i < rows; i++) {
				next[i] = new Array(columns);
			}

			init();
			game.set(next);
		};
		sketchControls = {
			fps: (frames: number) => {
				p5.frameRate(frames);
			},
			play: () => {
				p5_instance.loop();
			},
			pause: () => {
				p5_instance.noLoop();
			},
			background: (color: number) => {
				p5.background(color);
			},
			changeWidth(width: number) {
				p5.resizeCanvas(width, p5.height);
			}
		};



		storeSketchControls.set(sketchControls);
	};
</script>

<P5 {sketch} debug />

<Control />
