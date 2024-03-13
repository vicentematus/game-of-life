<script lang="ts">
	export let rows: number;
	export let columns: number;
	export let values: number[][];


    let mouse_down = false;
    let mouse_on_grid = false;
</script>

{#each Array(rows).fill(null) as _, rowIndex}
	<div class="flex">
		{#each Array(columns).fill(null) as _, columnIndex}
			<div
				class="h-10 w-10 border border-gray-600"
				class:bg-black={values[row][column] === 1}
			></div>
		{/each}
	</div>
{/each}
