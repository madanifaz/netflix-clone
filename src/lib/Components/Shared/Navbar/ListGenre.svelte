<script lang="ts">
	let listGenre: string[];
	import { locale } from '$lib/i18n';
	$: listGenre = $genres.data[$locale].map((genre) => genre.name).sort();

	import genres from '$lib/Data/GenreStore';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (!$genres.isLoaded) {
			await genres.load();
		}
	});
</script>

<ul class="text-left">
	{#each listGenre as category}
		<a href={`/movies?genre=${encodeURIComponent(category)}`}
			><li class="w-full px-7 py-1 first:py-3 text-[20px] md:text-base">{category}</li></a
		>
	{/each}
</ul>
