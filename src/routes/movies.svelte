<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		return {
			props: {
				limitGenre: page.query.get('genre')
			}
		};
	}
</script>

<script lang="ts">
	import Animate from '$lib/Components/Common/Animate.svelte';
	import BannerCarousel from '$lib/Components/Movies/BannerCarousel.svelte';
	import MovieCardsCarousel from '$lib/Components/Movies/MovieCardsCarousel.svelte';
	import MovieCard from '$lib/Components/Movies/MovieCard.svelte';
	import { fade } from 'svelte/transition';
	import movies from '$lib/Data/MovieStore';
	import genres from '$lib/Data/GenreStore';
	import { locale, _ } from '$lib/i18n';
	import { onMount } from 'svelte';
	import type { Genre } from '$lib/Interfaces/genre';
	import {
		moviesFilteredByGenreID,
		moviesByTrending,
		moviesSortedByRating
	} from '$lib/Data/MovieFilteredStore';
	export let limitGenre: string = '';
	$: limitGenreObject = $genres.data[$locale].find((genre: Genre) => {
		return genre.name === limitGenre;
	});

	onMount(async () => {
		if (!$genres.isLoaded) {
			await genres.load();
		}
		if (!$movies.isLoaded) {
			if (limitGenreObject) {
				await movies.load([limitGenreObject.id]);
			} else {
				await movies.load($genres.data[$locale].map((genre: Genre) => genre.id).slice(0, 9));
			}
			movies.injectGenres($genres);
		}
	});
</script>
u

<svelte:head>
	<title>Netflix - List Movie</title>
	<meta
		name="description"
		content="Netflix and Chill with 'friends'"
	/>
	<meta
		property="og:description"
		content="Netflix and Chill with 'friends'"
	/>
</svelte:head>

<Animate
	inAnimation={fade}
	outAnimation={fade}
	inOptions={{ duration: 300 }}
	outOptions={{ duration: 500 }}
>
	<main class="pt-24 md:pt-26">
		<BannerCarousel movies={$moviesByTrending} />

		<!-- Trending -->
		{#if !limitGenreObject}
			<MovieCardsCarousel
				title={$_('page.movies.bestOfAll')}
				moviesList={$moviesSortedByRating(20)}
			>
				<div
					slot="items"
					let:movie
					class="mx-2 md:mx-5 min-w-fit first:ml-7 first:md:ml-28 last:mr-7 last:md:mr-28"
				>
					<MovieCard imgSrc={movie.poster_path} title={movie.title} slug={movie.slug} />
				</div>
			</MovieCardsCarousel>
		{/if}

		<!-- Genre -->
		{#each limitGenreObject ? [limitGenreObject] : $genres.data[$locale].slice(0, 9) as genre}
			<MovieCardsCarousel title={genre.name} moviesList={$moviesFilteredByGenreID(genre.id)}>
				<div
					slot="items"
					let:movie
					class="mx-2 md:mx-5 min-w-fit first:ml-7 first:md:ml-28 last:mr-7 last:md:mr-28"
				>
					<MovieCard imgSrc={movie.poster_path} title={movie.title} slug={movie.slug} />
				</div>
			</MovieCardsCarousel>
		{/each}
	</main>
</Animate>
