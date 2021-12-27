<script>
	import { _ } from '$lib/i18n';
	import SearchIcon from '../Icons/SearchIcon.svelte';
</script>

<button class="flex my-6 items-center justify-center" on:click>
	<span class="mr-3">
		<SearchIcon />
	</span>
	{$_('shared.navbar.search')}
</button>
