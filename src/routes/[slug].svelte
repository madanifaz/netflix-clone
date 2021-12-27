<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		return {
			props: {
				slug: page.params.slug,
				isPlaying: page.query.has('play')
			}
		};
	}
</script>

<script lang="ts">
	import FilterBlurGradient from '$lib/Components/Home/FilterBlurGradient.svelte';
	import FilterGradient from '$lib/Components/Shared/FilterGradient.svelte';
	import MovieDetails from '$lib/Components/Shared/MovieDetails.svelte';
	import Credits from '$lib/Components/Slug/Credits.svelte';
	import ProductionCompanies from '$lib/Components/Slug/ProductionCompanies.svelte';
	import { _, locale } from '$lib/i18n';
	import { fly, fade, scale } from 'svelte/transition';
	import Animate from '$lib/Components/Common/Animate.svelte';
	import VideoPlayer from '$lib/Components/Slug/VideoPlayer.svelte';
	import MovieCover from '$lib/Components/Slug/MovieCover.svelte';
	import movies from '$lib/Data/MovieStore';
	import genres from '$lib/Data/GenreStore';
	import credits from '$lib/Data/CreditStore';
	import companies from '$lib/Data/CompanyStore';
	import { onMount, tick } from 'svelte';
	import type { Genre } from '$lib/Interfaces/genre';
	import type { Movie } from '$lib/Interfaces/movie';
	import { movieBySlug } from '$lib/Data/MovieFilteredStore';
	export let isPlaying = false;
	export let slug: string = '';
	let movie: Movie | undefined;
	$: backdropImage = movie ? movie.backdrop_path : '/backdrop-image.png';
	$: backdropImageStyle = `--bg-image-url:url('${backdropImage}');`;

	onMount(async () => {
		if (!$genres.isLoaded) {
			await genres.load();
		}
		if (!$movies.isLoaded) {
			await movies.load($genres.data[$locale].map((genre: Genre) => genre.id).slice(0,9));
			movies.injectGenres($genres);
		}
		movie = await $movieBySlug(slug)
		if (!movie) {
			window.location.href = window.location.href + '/notfound';
		}
		await credits.load(movie.id);
		await companies.load(movie.id);
	});
</script>

<svelte:head>
	<title>{slug.replace(/-/g, ' ')}</title>
	<meta
		name="description"
		content={"Netflix and Chill with 'friends' watching " + slug.replace(/-/g, ' ')}
	/>
	<meta
		property="og:description"
		content={"Netflix and Chill with 'friends' watching " + slug.replace(/-/g, ' ')}
	/>
</svelte:head>

<Animate
	inAnimation={fade}
	outAnimation={fade}
	inOptions={{ duration: 300 }}
	outOptions={{ duration: 300 }}
>
	<main
		class="{isPlaying ? 'h-[195px]' : 'h-[717px]'} md:h-[717px] w-full relative"
		style={backdropImageStyle}
	>
		{#if !isPlaying}
			<!-- Blur Navbar -->
			<div class="h-[69px] relative">
				<FilterBlurGradient />
			</div>
			<Animate outAnimation={fly} outOptions={{ y: 600, duration: 800 }}>
				<MovieCover
					{movie}
					on:play={() => {
						isPlaying = true;
						history.pushState('', '', '?play=1');
					}}
				/>
				<FilterGradient />
			</Animate>
		{:else}
			<Animate inAnimation={scale} inOptions={{ delay: 800, duration: 300, start: 0.8 }}>
				<div class="h-[195px] md:h-[717px] w-full absolute top-0 z-30">
					<VideoPlayer
						url="https://www.youtube.com/embed/4zH5iYM4wJo?enablejsapi=1&autoplay=1"
						title="Clifford the Big Red Dog"
					/>
				</div>
			</Animate>
		{/if}
	</main>
</Animate>
<div
	class="mx-4 md:mx-24 text-white {isPlaying
		? 'mt-10'
		: 'mt-40'} md:mt-14 pb-28 grid grid-cols-1 md:grid-cols-2"
>
	{#if isPlaying && movie}
		<Animate inAnimation={fade} inOptions={{ delay: 400, duration: 10 }}>
			<MovieDetails
				title={movie.title}
				summary={movie.overview}
				genres={movie.genre_list}
				isWithRating={true}
				rating={movie.vote_average}
			/>
		</Animate>
	{/if}

	{#key isPlaying}
		<Animate inAnimation={fly} inOptions={{ x: -300, duration: 1000 }}>
			<Credits credits={$credits.data} />
		</Animate>
	{/key}

	{#if !isPlaying}
		<Animate inAnimation={fly} inOptions={{ x: -300, duration: 1000 }}>
			<ProductionCompanies companies={$companies.data}/>
		</Animate>
	{/if}
</div>

<style lang="postcss">
	main {
		background-image: var(--bg-image-url, url('/backdrop-image.png'));
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
</style>
