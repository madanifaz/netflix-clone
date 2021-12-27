<script>
	import { _ } from '$lib/i18n';
	import DesktopNavigation from './DesktopNavigation.svelte';
	import MobileNavigation from './MobileNavigation.svelte';
	let isSearching = false;
</script>

<nav
	class="fixed top-0 left-0 flex align-center z-20 w-full h-[69px] px-7 md:px-28 text-white justify-between {isSearching
		? 'md:justify-start'
		: ''}"
>
	<a href="/" sveltekit:prefetch>
		<img src="/logo.png" alt="Logo" class="my-6" />
	</a>
	<!-- Show According on User Device -->
	<DesktopNavigation bind:isSearching />
	<MobileNavigation />
</nav>
