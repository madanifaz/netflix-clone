<script lang="ts">
	import SearchIcon from '../Icons/SearchIcon.svelte';
	import { _ } from '$lib/i18n';
	let searchPredection: string;
	let value: string;
	let baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${
		import.meta.env.VITE_API_KEY
	}&language=en-US&query=`;
	export let iconLocation = 'start';
	export let isFound = false;
	let movie;

	async function search(value) {
		if (value == '' || value == null) {
			searchPredection = '';
			isFound = false;
			return;
		}
		value = value.toLowerCase();
		const result = await fetch(baseURL + encodeURIComponent(value));
		const response = await result.json();

		console.log(response);

		movie = response.results.find((movie) => {
			return movie.title.toLowerCase().startsWith(value);
		});

		if (!movie) {
			searchPredection = '';
			isFound = false;
			return;
		}

		searchPredection = movie.title.toLowerCase();
		isFound = true;
	}

	async function submit() {
		if (!isFound) {
			return;
		}

		console.log(movie.title.replace(/\s+/g, '-'), 'submit');
		location.href = '/' + movie.title.replace(/\s+/g, '-');
	}

	function action(e) {
		console.log(e);
	}

	// todo
	$: search(value);
</script>

<form on:submit|preventDefault={submit}>
	<div class="flex w-full align-center items-center my-6 md:my-3 md:ml-9 md:text-white/50">
		{#if iconLocation === 'start'}
			<button type="submit">
				<SearchIcon />
			</button>
		{/if}

		<div class="relative md:ml-2 mx-auto flex items-center">
			<!-- Not Using Autofocus because A11y issue -->
			<input
				type="text"
				name="searchmovie"
				placeholder={$_('shared.navbar.searchPlaceHolder')}
				class="absolute bg-transparent border-0 outline-none text-background rounded rounded-r-none w-64 md:w-128 px-4 py-2 md:text-white italic md:font-normal font-medium placeholder:italic placeholder:font-medium md:placeholder:font-normal"
				bind:value
				on:blur
				on:input={(e) => {
					console.log(e);
					if (isFound) {
						console.log(movie.title.replace(/\s+/g, '-'), 'submit');
					}
				}}
			/>
			<input
				disabled
				bind:value={searchPredection}
				class="bg-white md:bg-transparent rounded rounded-r-none  w-64 md:w-128 px-4 py-2 text-background/50 md:text-white/50 italic font-medium md:font-normal"
			/>
			{#if iconLocation === 'end'}
				<button class="bg-white text-[#C4C4C4] px-4 py-2.5 rounded rounded-l-none" type="submit">
					<SearchIcon />
				</button>
			{/if}
		</div>
	</div>
</form>
