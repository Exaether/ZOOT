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
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin: 0;
		list-style: none;
		box-sizing: border-box;
		background-color: var(--bg-secondary);
	}

	li {
		flex-grow: 1;
		text-align: center;
	}

	.tab-btn {
		appearance: none;
		border: none;
		display: block;
		width: 100%;
		cursor: pointer;
		padding-block: .5em;
		font-family: sans-serif;
		color: var(--text-label);
		font-weight: bold;
		font-size: 1.2em;
		background-color: transparent;
		transition: all 0.2s;
		border-bottom: 2px solid black;
	}

	.tab-btn:hover {
		color: var(--text-primary);
		background-color: var(--bg-main);
	}

	li.active > .tab-btn {
		color: var(--text-primary);
		background-color: var(--bg-main);
		border-bottom-color: var(--color-accent);
	}

	@media (max-width: 600px) {
		.tab-btn {
			font-size: 1em;
			padding: 0.8em 0.2em;
		}
	}
</style>
