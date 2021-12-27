<script lang="ts">
	import Dropdown from '$lib/Components/Common/Dropdown.svelte';
	import { _, locale } from '$lib/i18n';
	import ListGenre from './ListGenre.svelte';
</script>

<Dropdown>
	<div slot="title" class="h-full">
		{$_('shared.navbar.allGenre')}
	</div>
	<div
		class="bg-background rounded-2xl w-48 shadow-xl z-20 overflow-y-scroll max-h-[250px]"
		slot="items"
	>
		<ListGenre />
	</div>
</Dropdown>
