<script lang="ts">
	import Caraousel from '../Common/Caraousel.svelte';
	import BannerItems from './BannerItems.svelte';
	import CarouselNavigation from '../Common/CarouselNavigation.svelte';
	import type { Movie } from '$lib/Interfaces/movie';
	let carousel: HTMLElement;
	let carouselItems: HTMLElement[] = [];
	export let movies: Movie[];
</script>

<div class="w-full">
	<Caraousel withSnap={true} bind:carousel>
		{#each movies as movie, i}
			<div
				class="relative snap-center items first:ml-7 first:md:ml-28 last:mr-7 last:md:mr-28 rounded-[20px] flex-shrink-0 mx-4"
				bind:this={carouselItems[i]}
			>
				<a href={`/${movie.slug}?play=1`} sveltekit:prefetch>
					<BannerItems
						title={movie.title}
						summary={movie.overview}
						genres={movie.genre_list}
						bannerSrc={movie.backdrop_path}
						slug={movie.slug}
					/>
				</a>
			</div>
		{/each}
	</Caraousel>
	<CarouselNavigation {carouselItems} {carousel} />
</div>

<style lang="postcss">
	.items {
		filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
	}
</style>
