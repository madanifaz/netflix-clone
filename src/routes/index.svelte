<script lang="ts">
	import Animate from '$lib/Components/Common/Animate.svelte';
	import FilterBlurGradient from '$lib/Components/Home/FilterBlurGradient.svelte';
	import ButtonAction from '$lib/Components/Shared/ButtonAction.svelte';
	import FilterGradient from '$lib/Components/Shared/FilterGradient.svelte';
	import { _ } from '$lib/i18n';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Netflix</title>
	<meta
		name="description"
		content="Netflix and Chill with 'friends'"
	/>
	<meta
		property="og:description"
		content="Netflix and Chill with 'friends'"
	/>
</svelte:head>
<Animate
	inAnimation={fade}
	outAnimation={fade}
	inOptions={{ duration: 300 }}
	outOptions={{ duration: 500 }}
>
	<main
		class="w-full h-screen relative bg-[url('/background-home-mobile.png')] md:bg-[url('/background-home.png')] bg-no-repeat bg-cover bg-center"
	>
		<!-- Blur Navbar -->
		<div class="h-[69px] relative">
			<FilterBlurGradient />
		</div>
		<FilterGradient />
		<header class="absolute left-4 right-4 bottom-11 md:left-28 md:bottom-36 text-white">
			<h1 class="text-[42px] lg:text-[52px] font-black">{$_('page.home.header')}</h1>
			<h2 class="text-xl lg:text-[42px] mt-5 md:mt-2 mb-24 md:mb-14">
				{$_('page.home.subHeader')}
			</h2>
			<a href="/movies" sveltekit:prefetch>
				<ButtonAction>{$_('page.home.CTA')}</ButtonAction>
			</a>
		</header>
	</main>
</Animate>
