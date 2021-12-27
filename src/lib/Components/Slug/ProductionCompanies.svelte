<script lang="ts">
	import { _ } from '$lib/i18n';
	import InformationList from '../Shared/InformationList.svelte';

	export let companies: any[];
</script>

<section>
	<h2 class="text-[32px] md:text-[42px] font-bold">{$_('page.movieSlug.productionCompnanies')}</h2>
	<ul>
		{#each companies as company}
			<li class="flex items-center mt-4">
				<InformationList title={company.name} subTitle={company.origin_country} />
			</li>
		{/each}
	</ul>
</section>
