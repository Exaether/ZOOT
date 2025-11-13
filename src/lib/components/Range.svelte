<script lang="ts">
import ranges from "$lib/data/ranges.json"

let {rangeId} = $props()

const range = ranges[rangeId].grids
const minRow = Math.min(...range.map(c => c.row));
const maxRow = Math.max(...range.map(c => c.row));
const minCol = Math.min(...range.map(c => c.col));
const maxCol = Math.max(...range.map(c => c.col));

function isInRange(r: number, c: number) {
    return range.some((cell: { row: number; col: number; }) => cell.row === r && cell.col === c);
}

</script>

<table class="range">
	{#each Array(maxRow - minRow + 1) as _, r}
		<tr>
			{#each Array(maxCol - minCol + 1) as _, c}
				<td
					class:inRange={isInRange(r + minRow, c + minCol)}
					class:center={r+minRow == 0 && c + minCol == 0}
				></td>
			{/each}
		</tr>
	{/each}
</table>

<style>
.range {
	margin: auto;
}

td {
	width: .8em;
	height: .8em;
}

td.inRange {
	border: 2px solid hsl(0, 0%, 80%);
}

td.center {
	border: 2px solid hsl(0, 0%, 80%);
	background-color: hsl(0, 0%, 80%);
}

</style>
