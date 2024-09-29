<script lang="ts">
	import { random_game} from '$lib/game/data';
	import { DEFAULT_FPS, isPlaying, storeSketchControls } from '$lib/game/sketch';


	function play() {
		$storeSketchControls.play();
	}

	function pause() {
		$storeSketchControls.pause();
	}

	function toggle_play() {
		if ($isPlaying) {
			pause();
		} else {
			play();
		}

		isPlaying.set(!$isPlaying);
	}

	let color;
	function change_color(hex: number) {
		$storeSketchControls.background(hex);
	}

	let fps: number = DEFAULT_FPS;
	function change_fps() {
		$storeSketchControls.fps(fps);
	}
</script>

<aside
	class="absolute bottom-0 translate-x-2 translate-y-2 bg-gray-900 px-4 py-4 text-white shadow-lg"
>
	<div class="flex flex-row">
		<div class="flex flex-col">
			<h1 class="text-xl">Game Of Life</h1>
			<label class="text-white" for="fps">FPS</label>
			<small class="text-white">Define how fast the game progress</small>
		</div>

		<div class="flex">
			<input
				id="fps"
				type="range"
				class="w-32"
				min="5"
				max="80"
				step="5"
				aria-orientation="horizontal"
				bind:value={fps}
				on:change={change_fps}
			/>
			<p class="text-white">{fps}</p>
		</div>
	</div>
	<!-- 
<button
	title="Reset the game state"
	aria-label="Reset the game state"
	type="button"
	class="rounded-lg bg-white px-4 py-2 hover:bg-gray-200"
	on:click={restart_game}
>
	Reset
</button> -->

	<button
		title="Create a random game state"
		aria-label="Create a random game state"
		type="button"
		class="rounded-lg bg-blue-500 px-4 py-2 hover:bg-blue-500"
		on:click={random_game}
	>
		Random game
	</button>
	<button
		title={$isPlaying ? 'Pause' : 'Play'}
		aria-label={$isPlaying ? 'Pause' : 'Play'}
		type="button"
		class="rounded-lg bg-blue-400 px-4 py-2 hover:bg-blue-300"
		on:click={toggle_play}
	>
		{$isPlaying ? 'Pause' : 'Play'}
	</button>
	



</aside>
