<script>
	import { _, locale, locales } from '$lib/i18n';
	import ArrowIcon from '../Icons/ArrowIcon.svelte';

	let select;
</script>

<div
	class="hidden md:flex align-center items-center"
	on:click={() => {
		select.click();
	}}
>
	<select
		bind:value={$locale}
		class="px-4 py-2 bg-transparent border-0 outline-none"
		bind:this={select}
	>
		{#each locales as value}
			<option {value}>
				{value}
			</option>
		{/each}
	</select>
</div>

<style>
	select {
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
		background-position: right 0.5rem center;
		background-repeat: no-repeat;
		background-size: 1.5em 1.5em;
		padding-right: 2.5rem;
	}
</style>
