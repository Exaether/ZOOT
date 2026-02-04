<script lang="ts">
    import { images_url } from "$lib/consts";

    let { potentials, selectedPotential = $bindable() } = $props();
    let isDropdownOpen = $state(false);

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

    function selectPotential(rank: number) {
        selectedPotential = rank;
        isDropdownOpen = false;
    }
</script>

<svelte:window
    onclick={(e) => {
        // Close dropdown if clicked outside
        if (
            isDropdownOpen &&
            !(e.target as Element).closest(".custom-select")
        ) {
            isDropdownOpen = false;
        }
    }}
/>

<div class="potential-select">
    <label for="potential-select-input">Potential:</label>
    <div class="custom-select">
        <button class="selected-option" onclick={toggleDropdown}>
            <img
                src="{images_url}/ui/potential/potential_{selectedPotential}.webp"
                alt="Rank {selectedPotential}"
            />
        </button>
        {#if isDropdownOpen}
            <div class="options-list">
                {#each { length: 6 }, i}
                    <button class="option" onclick={() => selectPotential(i)}>
                        <img
                            src="{images_url}/ui/potential/potential_{i}.webp"
                            alt="Rank {i}"
                        />
                        <span class="option-desc">
                            {#if i > 0}
                                {potentials[i - 1].description}
                            {:else}
                                Base
                            {/if}
                        </span>
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .potential-select {
        background-color: #1f1f1f;
        border-radius: 4px;
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;

        label {
            font-weight: bold;
        }

        .custom-select {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        button.selected-option {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5em;
            background: none;
            border: none;
            cursor: pointer;
            img {
                width: 3em;
                height: 3em;
            }
        }

        .options-list {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: hsl(0, 0%, 15%);
            border-radius: 5px;
            padding: 0.5em;
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            z-index: 10;
            overflow-y: auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            width: max-content;
            min-width: 100%;

            .option {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.2em;
                transition: background-color 0.2s;
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 0.5em;
                text-align: left;
                color: whitesmoke;

                &:hover {
                    background-color: hsl(0, 0%, 25%);
                }

                img {
                    width: 2.5em;
                    height: 2.5em;
                    flex-shrink: 0;
                }

                .option-desc {
                    font-size: 0.9em;
                    white-space: nowrap;
                }
            }
        }
    }

    @media (max-width: 600px) {
        .potential-select {
            width: 30%;
        }
    }
</style>
