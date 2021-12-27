<script lang="ts">
	export let type: number;
	let size = 'h-4 w-4';

	// calculate size based result of subtraction between active index and element index
	// 0 = primary
	// 4+ = none
	$: if (typeof type !== 'undefined') {
		switch (type) {
			case 0:
				size = 'h-3 w-3';
				break;
			case 1:
				size = 'h-2.5 w-2.5';
				break;
			case 2:
				size = 'h-2 w-2';
				break;
			case 3:
				size = 'h-1.5 w-1.5';
				break;
			default:
				size = 'hidden';
		}
	}
</script>

<button
	aria-label="Carousel Navigation"
	class="bg-white rounded-full mx-1 {size} transition ease-out"
	on:click
	disabled={type === 0}
/>
