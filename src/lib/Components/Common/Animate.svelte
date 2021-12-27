<script>
	import { fade } from 'svelte/transition';
	export let inAnimation = fade;
	export let inOptions = { duration: 0 };
	export let outAnimation = fade;
	export let outOptions = { duration: 0 };
</script>

<div in:inAnimation={inOptions} out:outAnimation={outOptions}>
	<slot />
</div>
