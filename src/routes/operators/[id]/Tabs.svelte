<script>
import { onMount } from "svelte";

export let items = [];
export let activeTabValue;

onMount(() => {
	// Set default tab value
	if (Array.isArray(items) && items.length && items[0].value) {
		activeTabValue = items[0].value;
	}
});

const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<ul>
	{#if Array.isArray(items)}
		{#each items as item}
			<li class={activeTabValue === item.value ? 'active' : ''}>
				<span on:click={handleClick(item.value)}>{item.label}</span>
			</li>
		{/each}
	{/if}
</ul>

<style>
ul {
	width: 100%;
	height: 8%;
	display: flex;
	flex-wrap: wrap;
	padding-left: 0;
	margin: 0;
	list-style: none;
	background-color: hsla(0, 0%, 10%, 97%);
}

span {
	height: 100%;
	display: block;
	cursor: pointer;
	padding-inline: 1em;
	font-family: sans-serif;
	color: whitesmoke;
	font-weight: bold;
	font-size: 1.8em;
	background-color: hsla(0, 0%, 17%, 97%);
	transition: background-color .3s;
}

span:hover {
	background-color: hsla(0, 0%, 20%, 97%);
}

li.active > span {
	background-color: hsla(0, 0%, 20%, 97%);
}
</style>
