<script lang="ts">
	import ButtonAction from '../Shared/ButtonAction.svelte';
	import FilterGradient from '../Shared/FilterGradient.svelte';
	import PlayIcon from '../Shared/Icons/PlayIcon.svelte';
	import MovieDetails from '../Shared/MovieDetails.svelte';
	import { _ } from '$lib/i18n';

	export let title: string;
	export let summary: string;
	export let genres: string[];
	export let bannerSrc: string;
	export let slug: string;
</script>

<div class="hidden md:block absolute text-white bottom-16 left-16 z-20 border-b-1">
	<MovieDetails {title} {summary} {genres}>
		<div class="pt-9" slot="button-action">
			<a href={`/${slug}?play=1`} sveltekit:prefetch>
				<ButtonAction>{$_('page.movies.CTA')} <span class="ml-4"><PlayIcon /></span></ButtonAction>
			</a>
		</div>
	</MovieDetails>
</div>
<FilterGradient radius="rounded-[20px]" sizing="h-full w-full" />
<img
	src={bannerSrc}
	alt="Banner of {title}"
	class=" w-[331px] md:w-[1237px] h-[167px] md:h-[646px] rounded-[20px]"
/>
