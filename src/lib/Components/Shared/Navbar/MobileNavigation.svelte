<script lang="ts">
	import Accordion from '$lib/Components/Common/Accordion.svelte';
	import { _ } from '$lib/i18n';

	import Modal from '$lib/Components/Common/Modal.svelte';
	import MenuIcon from '../Icons/MenuIcon.svelte';
	import NavigationViewPlans from './NavigationViewPlans.svelte';
	import SearchMovie from './SearchMovie.svelte';
	import ListGenre from './ListGenre.svelte';
	import ArrowIcon from '../Icons/ArrowIcon.svelte';

	let isModalShow = false;
	let isAccordionShow = false;
</script>

<div class="block md:hidden py-6">
	<button
		on:click={() => {
			isModalShow = true;
		}}
	>
		<MenuIcon />
	</button>

	<Modal bind:isShow={isModalShow}>
		<div class="mt-24 px-4 flex flex-col">
			<SearchMovie iconLocation="end" />
			<span class="mt-20" />
			<Accordion bind:isShow={isAccordionShow}>
				<div slot="title" class="text-[24px] font-medium flex items-center">
					{$_('shared.navbar.allGenre')}
					<span
						class="ml-4 mt-1 {isAccordionShow ? 'rotate-180' : ''} transition ease-out duration-300"
					>
						<ArrowIcon />
					</span>
				</div>
				<ListGenre slot="content" />
			</Accordion>
			<NavigationViewPlans />
		</div>
	</Modal>
</div>
