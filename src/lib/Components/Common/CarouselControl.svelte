<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import ArrowIcon from '../Shared/Icons/ArrowIcon.svelte';
	export let carousel: HTMLElement;
	let scrollLeftPosition: number = 0;
	let scrollLeftMax: number;

	$: if (typeof carousel !== 'undefined') {
		carousel.addEventListener('scroll', parseScroll);
	}

	function parseScroll() {
		scrollLeftPosition = carousel.scrollLeft;
		scrollLeftMax = carousel.scrollWidth - carousel.clientWidth;
	}

	function scrollX(amount: number) {
		carousel.scrollBy({
			left: amount,
			behavior: 'smooth'
		});
	}
</script>

<div class="flex">
	<button
		class="rotate-90"
		disabled={scrollLeftPosition === 0}
		on:click={() => {
			scrollX(-carousel.clientWidth);
		}}
	>
		<ArrowIcon />
	</button>
	<button
		class="-rotate-90"
		disabled={scrollLeftPosition === scrollLeftMax}
		on:click={() => {
			scrollX(carousel.clientWidth);
		}}
	>
		<ArrowIcon />
	</button>
</div>

<style lang="postcss">
	button {
		@apply ml-2 border rounded text-primary border-background shadow-2xl p-2 mb-1;
		background: rgba(17, 37, 57, 1);
	}
	button:disabled {
		background: rgba(17, 37, 57, 0.5);
	}
</style>
