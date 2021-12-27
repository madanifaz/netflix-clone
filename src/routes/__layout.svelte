<script>
	import Navbar from '$lib/Components/Shared/Navbar/Navbar.svelte';
	import '../app.postcss';
</script>

<div class="min-h-screen w-full bg-[#0f161d]">
	<Navbar />
	<slot />
</div>
