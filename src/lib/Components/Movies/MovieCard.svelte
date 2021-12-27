<script lang="ts">
	export let imgSrc: string;
	export let title: string;
	export let slug: string;
</script>

<a href={`/${slug}`} sveltekit:prefetch>
	<img
		src={imgSrc}
		alt={title}
		class="w-[126px] h-[189px] md:w-[269px] md:h-[403px] rounded-xl md:rounded-[40px]"
	/>
</a>
