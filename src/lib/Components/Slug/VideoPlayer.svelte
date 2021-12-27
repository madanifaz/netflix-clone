<script lang="ts">
	export let title: string;
	export let url: string;
</script>

<iframe id="player" {title} class="w-full h-full" src={url} />
