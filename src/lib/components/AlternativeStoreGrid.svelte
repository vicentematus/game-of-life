<script lang="ts">
	import {
		game,
		restart_game,
		store_columns,
		store_rows,
		DEAD,
		ALIVE,
		DEBUG_NUMBER,
		random_game
	} from '$lib/game/data';
	import { check_neighbors } from '$lib/game/rules';
	import { storeSketchControls, type SketchControls, fps } from '$lib/game/sketch';
	import P5, { type p5 } from 'p5-svelte';
	import { onMount, setContext } from 'svelte';
	import Control from './Control.svelte';
	// $: console.log({ $store_columns });
	// $: console.log({ $store_rows });
	// $: console.log('game es ', { $game });

	// recommended by p5.js game of life implementation to avoid stuttering
	let sketchFps= fps ;
	let is_playing: boolean = true;


	let width = 400;
	let height = 400;
	let p5_instance: p5;
	// falta definir el tipo aca
	let sketchControls: SketchControls;

	const sketch = (p5: p5) => {
		p5_instance = p5;
		let width = 400;
		let height = 400;
		let board: number[][];
		let w: number = 20;
		let columns: number;
		let rows: number;
		let next: number[][];

		p5.setup = () => {
			p5.frameRate($sketchFps);
			p5.createCanvas(400, 400);

			// todo: agregar implementacion de height y width del contenedor
			// console.log('el objeto de windows es ',window)
			// console.log(window.innerHeight)
			// p5.floor(window.innerHeight)

			// lo infiere del canvas
			console.log(p5.width);

			// ojo aca estamos seteando las columnas
			columns = p5.floor(p5.width / w);
			console.log('collumnas ern p5 es ', columns);

			store_columns.set(columns);

			//aca estamos seteando las rows
			rows = p5.floor(p5.height / w);
			store_rows.set(rows);

			board = new Array(columns);

			for (let i = 0; i < columns; ++i) {
				board[i] = new Array(rows);
			}

			next = new Array(columns);
			for (let i = 0; i < columns; i++) {
				next[i] = new Array(rows);
			}

			function init() {
				for (let i = 0; i < columns; i++) {
					for (let j = 0; j < rows; j++) {
						next[i][j] = p5.floor(p5.random(2));
					}
				}
			}
			console.log({ board });

			init();

			console.log({ next });

			// seteando el game state
			const next_state = next;
			game.set(next_state);

			// voy a setear el game state aca para cachar
		};

		p5.draw = () => {
			p5.background(255);
			console.log('me ejecuto en el draw')
			function paint() {
				for (let i = 0; i < columns; i++) {
					for (let j = 0; j < rows; j++) {
						if (next[i][j] == 1) {
							p5.fill('orange');
						} else {
							p5.fill(255);
						}
						p5.stroke(0);
						p5.rect(i * w, j * w, w - 1, w - 1);
					}
				}
			}

			function play() {
				for (let i = 0; i < columns; i++) {
					for (let j = 0; j < rows; j++) {
						let state = next[i][j];
						let neighbors: number = check_neighbors(i, j);

						if (state == 0 && neighbors == 3) {
							board[i][j] = 1;
						} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
							board[i][j] = 0;
						} else {
							board[i][j] = state;
						}
					}
				}

				// esto se encarga de ejevcutar las cosas
				let temp = next;
				next = board;
				board = temp;
			}

			// hardcodeado para que este escuchando a los fps
			// p5.frameRate(sketchFps);

			paint();
			play();
		};

		sketchControls = {
			fps: (frames: number) => {
				console.log('modificaste los fps de la instancia de p5')
				p5.frameRate(frames);
			},
			play: () => {
				p5_instance.loop();
			},
			pause: () => {
				p5_instance.noLoop();
			},
			background: (color: number) => {
				console.log('seteando el color')
				p5.background(color);
			},  
			changeWidth(width: number) {
				console.log
				p5.resizeCanvas(width, p5.height);
			},
			
		};

		storeSketchControls.set(sketchControls);

	};

</script>

<!-- <div>
	<label class="text-white" for="">FPS</label>
	<input type="range" min="10" max="80" step="5" aria-orientation="horizontal" bind:value={fps} />
	<p class="text-white">{fps}</p>
</div> -->


<Control />
<P5 {sketch} debug />
