<script lang="ts">
	import CloseIcon from '../Shared/Icons/CloseIcon.svelte';
	import { fly } from 'svelte/transition';

	export let isShow: Boolean;

	// stop scroll when up
	$: if (typeof document !== 'undefined') {
		isShow
			? document.body.classList.add('stopScroll')
			: document.body.classList.remove('stopScroll');
	}
</script>

{#if isShow}
	<div
		class="fixed h-full w-full left-0 top-0 bg-background/95 overflow-y-scroll overflow-x-hidden"
		in:fly={{ x: 200, duration: 500 }}
		out:fly={{ x: 200, duration: 500 }}
	>
		<div class="flex w-full flex-row-reverse p-7">
			<button
				on:click={() => {
					isShow = false;
				}}><CloseIcon /></button
			>
		</div>
		<slot />
	</div>
{/if}
