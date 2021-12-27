<script lang="ts">
	import CarouselNavigationButton from './CarouselNavigationButton.svelte';
	let activeIndex = 0;
	export let carousel: HTMLElement;
	export let carouselItems: HTMLElement[];

	function scrollIntoView(index: number) {
		carouselItems[index].scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest'
		});
	}

	// add scroll event
	$: if (typeof carousel !== 'undefined') {
		carousel.addEventListener('scroll', parseScroll);
	}

	// Calculate active index by using current scroll position
	function parseScroll() {
		let scrollLeftPosition = carousel.scrollLeft;
		let scrollLeftMax = carousel.scrollWidth - carousel.clientWidth;
		activeIndex =
			carouselItems.length -
			Math.round((scrollLeftMax - scrollLeftPosition) / carouselItems[0].clientWidth) -
			1;
	}
</script>

<div class="w-full flex items-center justify-center mt-4 mb-4">
	{#each Array(carouselItems.length) as _, i}
		<!-- Calculate the size based on how close index to activeIndex ex: 0 = h-3 w-3, 4+ = hidden -->
		<CarouselNavigationButton type={Math.abs(activeIndex - i)} on:click={() => scrollIntoView(i)} />
	{/each}
</div>
