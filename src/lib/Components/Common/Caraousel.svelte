<script>
	export let withSnap = true;
	export let carousel;
</script>

<div
	class="hide-scroll min-w-full overflow-x-scroll flex align-center {withSnap
		? 'snap-x snap-mandatory'
		: ''}"
	bind:this={carousel}
>
	<slot />
</div>

<style lang="postcss">
	.hide-scroll {
		-ms-overflow-style: none;
		scrollbar-width: none;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		-ms-overflow-style: none;
	}
	.hide-scroll::-webkit-scrollbar {
		display: none;
	}
</style>
