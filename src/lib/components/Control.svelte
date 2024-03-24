<script lang="ts">
	import { random_game, restart_game } from '$lib/game/data';
	import { getContext } from 'svelte';
	import { DEFAULT_FPS, isPlaying, storeSketchControls } from '$lib/game/sketch';

	console.log(getContext('prueba'));

	$: console.log($isPlaying);



	function play() {
		$storeSketchControls.play();
	}

	function pause() {
		$storeSketchControls.pause();
	}

	function toggle_play() {
		console.log('me toggleaste');
		if ($isPlaying) {
			play();
		} else {
			pause();
		}

		isPlaying.set(!$isPlaying);
	}

	let color;
	function change_color(hex: number) {
		console.log('recibiste lo siguiente ', hex);
		console.log('cambiaste el color');
		$storeSketchControls.background(hex);
	}

	let fps: number = DEFAULT_FPS;
	function change_fps() {
		$storeSketchControls.fps(fps);
	}
</script>

<div>
	<label class="text-white" for="">FPS</label>
	<input
		type="range"
		min="5"
		max="80"
		step="5"
		aria-orientation="horizontal"
		bind:value={fps}
		on:change={change_fps}
	/>
	<p class="text-white">{fps}</p>
</div>

<button
	title="Reset the game state"
	aria-label="Reset the game state"
	type="button"
	class="rounded-lg bg-white px-4 py-2 hover:bg-gray-200"
	on:click={restart_game}
>
	Reset
</button>

<button
	title="Create a random game state"
	aria-label="Create a random game state"
	type="button"
	class="rounded-lg bg-white px-4 py-2 hover:bg-gray-200"
	on:click={random_game}
>
	Random game
</button>

<button
	title={$isPlaying ? 'Play' : 'Pause'}
	aria-label={$isPlaying ? 'Play' : 'Pause'}
	type="button"
	class="rounded-lg bg-white px-4 py-2 hover:bg-gray-200"
	on:click={toggle_play}
>
	{$isPlaying ? 'Play' : 'Pause'}
</button>
