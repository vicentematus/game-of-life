<script lang="ts">
	import { ALIVE, DEBUG_NUMBER, game } from '$lib/game/data';
	import { tick } from 'svelte';

	export let rowIndex: number = 0;
	export let columnIndex: number = 0;

	$: {
		// console.log('soy una variable reactiva');
		const isAlive = $game[rowIndex][columnIndex] === 1;
		// console.log(rowIndex, columnIndex);
	}
</script>

{#if $game[rowIndex][columnIndex] === DEBUG_NUMBER}
	<div class="h-10 w-10 border border-gray-100 bg-red-800"></div>
{:else if $game[rowIndex][columnIndex] === ALIVE}
	<div class="h-10 w-10 border border-gray-100 bg-white">
        🍀
    </div>
{:else}
	<div class="h-10 w-10 border border-gray-100 ">
        💀
    </div>
{/if}
