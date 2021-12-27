<script>
	import { createEventDispatcher } from 'svelte';
	import ButtonAction from '../Shared/ButtonAction.svelte';
	import MovieDetails from '../Shared/MovieDetails.svelte';
	import { _ } from '$lib/i18n';
	import PlayIcon from '../Shared/Icons/PlayIcon.svelte';

	const dispatch = createEventDispatcher();
	export let movie;
</script>

{#if movie}
	<div class="absolute top-72 md:top-44 left-4 right-4 md:left-24 text-white z-10">
		<MovieDetails
			title={movie.title}
			summary={movie.overview}
			genres={movie.genre_list}
			isWithRating={true}
			rating={movie.vote_average}
		>
			<div class="mt-5" slot="button-action">
				<ButtonAction on:click={() => dispatch('play')}>
					{$_('page.movieSlug.CTA')} <span class="ml-3 md:ml-6"><PlayIcon /></span>
				</ButtonAction>
			</div>
		</MovieDetails>
	</div>
{/if}
