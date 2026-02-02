<script lang="ts">
	let { items = [], activeTabValue = $bindable() } = $props();

	if (
		Array.isArray(items) &&
		items.length &&
		items[0].value &&
		!activeTabValue
	) {
		activeTabValue = items[0].value;
	}
</script>

<ul>
	{#if Array.isArray(items)}
		{#each items as item}
			<li class={activeTabValue === item.value ? "active" : ""}>
				<button
					class="tab-btn"
					onclick={() => (activeTabValue = item.value)}
				>
					{item.label}
				</button>
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
		border-top: 1px solid black;
		box-sizing: border-box;
		background-color: hsla(0, 0%, 13%, 97%);
	}

	.tab-btn {
		appearance: none;
		border: none;
		height: 100%;
		width: 100%;
		display: block;
		cursor: pointer;
		padding-inline: 1em;
		font-family: sans-serif;
		color: whitesmoke;
		font-weight: bold;
		font-size: 1.8em;
		background-color: hsla(0, 0%, 13%, 97%);
		transition: background-color 0.3s;
	}

	.tab-btn:hover {
		background-color: hsla(0, 0%, 20%, 97%);
	}

	li {
		flex-grow: 1;
		text-align: center;
	}

	li.active > .tab-btn {
		background-color: hsla(0, 0%, 20%, 97%);
	}
</style>
