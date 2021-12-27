<script>
	import { _ } from '$lib/i18n';
	import InformationList from '../Shared/InformationList.svelte';

	export let credits = [];
	let limit = 5;
</script>

<section class="mb-16">
	<h2 class="text-[32px] md:text-[42px] font-bold">{$_('page.movieSlug.credits')}</h2>

	<ul>
		{#each credits.slice(0, limit) as credit}
			<li class="flex items-center mt-4">
				{#key credit}
					<div
						class="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mr-3 md:mr-5"
					>
						<img
							src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
							alt={`${credit.name} Photo`}
							class="rounded-full"
						/>
					</div>
				{/key}
				<InformationList title={credit.name} subTitle={`As ${credit.character}`} />
			</li>
		{/each}
	</ul>

	{#if limit !== credits.length}
		<button
			class="text-white/70 text-[20px] mt-8"
			on:click={() => {
				limit = credits.length;
			}}
		>
			{$_('page.movieSlug.seeMore')}
		</button>
	{/if}
</section>
