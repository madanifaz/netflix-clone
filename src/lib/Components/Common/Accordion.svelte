<script>
	export let isShow;
	import { fly } from 'svelte/transition';
</script>

<button
	class="bg-transparent mb-4 text-left"
	on:click={() => {
		isShow = !isShow;
	}}
>
	<slot name="title" />
</button>
{#if isShow}
	<div in:fly={{ y: -50, duration: 500 }} out:fly={{ y: -50, duration: 200 }}>
		<slot name="content" />
	</div>
{/if}
