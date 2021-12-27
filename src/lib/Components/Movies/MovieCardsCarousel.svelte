<script lang="ts">
	import type { Movie } from '$lib/Interfaces/movie';

	import Caraousel from '../Common/Caraousel.svelte';
	import CarouselControl from '../Common/CarouselControl.svelte';

	export let title: string = 'Best Of All';
	export let moviesList: Movie[];
	let carousel: HTMLElement;
</script>

{#if moviesList.length > 0}
	<section class="text-white text-[24px] md:text-[42px] font-bold py-2.5 md:py-8">
		<header class="flex items-end justify-between px-7 md:px-28 mb-6">
			<h3>{title}</h3>
			<CarouselControl {carousel} />
		</header>

		<Caraousel bind:carousel>
			{#each moviesList as movie}
				<slot name="items" {movie} />
			{/each}
		</Caraousel>
	</section>
{/if}
