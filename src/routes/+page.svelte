<script lang="ts">
	import AlternativeStoreGrid from '$lib/components/AlternativeStoreGrid.svelte';
import Grid from '$lib/components/Grid.svelte';
	import GridP5 from '$lib/components/GridP5.svelte';
	import { game } from '$lib/game/data';
	import { tick } from 'svelte';

	// create a matrix for game of life
	const matrix = Array.from({ length: 10 }, () =>
		Array.from({ length: 10 }, () => (Math.random() > 0.5 ? 1 : 0))
	);

	game.set(matrix);
	console.log(matrix);
</script>

<main class="flex items-center justify-center">
	<section>
		<h1 class="text-3xl">game of life</h1>
		<!-- <Grid  rows={$game.length} columns={$game[0].length}/> -->
	</section>
	<section>
		  <!-- esta es la altenrnativa inicial -->
		<!-- <GridP5/> -->
		<AlternativeStoreGrid/>
	</section>
</main>
