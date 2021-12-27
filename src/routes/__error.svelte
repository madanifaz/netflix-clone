<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status: `${status}`,
			}
		};
	}
</script>

<script>
	export let status;
    import { _ } from '$lib/i18n';
</script>

<div class="h-screen w-full flex flex-col items-center justify-center">
	<h1 class="text-[108px] font-black text-primary">{status}</h1>
    <p class="text-white mx-5 text-center font-bold">{$_('page.error.message')}</p>
</div>
