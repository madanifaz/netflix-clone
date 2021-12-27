<script lang="ts">
	import { _ } from '$lib/i18n';
	import ButtonSearch from './ButtonSearch.svelte';
	import GenreDropDown from './GenreDropDown.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import SearchMovie from './SearchMovie.svelte';
	import { fade, fly } from 'svelte/transition';

	export let isSearching = false;
</script>

{#if !isSearching}
	<div
		class="hidden md:flex justify-around align-items max-w-sm w-full h-full"
		in:fade={{ delay: 250, duration: 500 }}
	>
		<GenreDropDown />
		<ButtonSearch
			on:click={() => {
				isSearching = true;
			}}
		/>
		<a href="/#" class="my-6">{$_('shared.navbar.viewPlans')}</a>
	</div>
	<LanguageSwitcher />
{:else}
	<div class="hidden md:flex" in:fly={{ x: 200, duration: 500 }} out:fly={{ x: 50, duration: 250 }}>
		<SearchMovie on:blur={() => (isSearching = false)} />
	</div>
{/if}
