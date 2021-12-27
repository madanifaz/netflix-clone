<script lang="ts">
	import DolbyAtmosIcon from './Icons/DolbyAtmosIcon.svelte';
	import DolbyVisionIcon from './Icons/DolbyVisionIcon.svelte';
	import StarIcon from './Icons/StarIcon.svelte';

	export let title: string;
	export let summary: string;
	export let genres: string[];
	export let isWithRating: Boolean = false;
	export let rating: Number = 0;

	$: allGenre = genres.join(', ');
</script>

<section>
	<h1 class="font-black text-[32px] mb-4">{title}</h1>
	<div class="flex flex-col">
		<p class="max-w-[522px] mb-4 mt-4 md:mt-0 order-last md:order-first">
			{summary}
		</p>
		<p class="text-white/70 mb-4 leading-none hidden md:block">{allGenre}</p>
		<div class="flex items-center mb-4">
			<span class="mr-6">
				<DolbyAtmosIcon />
			</span>
			<DolbyVisionIcon />
		</div>
		{#if isWithRating}
			<div class="flex align-center text-white/70">
				<StarIcon /> <span class="ml-2">{rating}</span>
			</div>
		{/if}

		<slot name="button-action" />
	</div>
</section>
