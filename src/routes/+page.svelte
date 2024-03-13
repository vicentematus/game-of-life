<script lang="ts">
	import Grid from '$lib/components/Grid.svelte';
	import { tick } from 'svelte';

	let count = 1;
	$: double = count * 2;

	async function increment() {
		count++;
		await tick();
		console.log(double);
	}
	// create a matrix for game of life
	const matrix = Array.from({ length: 10 }, () =>
		Array.from({ length: 10 }, () => (Math.random() > 0.5 ? 1 : 0))
	);
	increment();
	console.log(matrix);
</script>
 <h1 class="text-3xl mt-14">game of life</h1>
<Grid rows={10} columns={10} values={matrix} />
