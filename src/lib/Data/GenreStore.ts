import { writable, get } from 'svelte/store';
import type { Genre, GenreStore, ResponseJSON } from '$lib/Interfaces/genre';
import { locales } from '$lib/i18n';

const { subscribe, set } = writable<GenreStore>(initData());

function initData(){
	const data = {
		isLoaded: false,
		data: {}
	}

	locales.forEach((locale) => {
		data.data[locale] = []
	})

	return data as GenreStore
}

function buildUrl(locale: string): string {
	const url = new URL(
		`${import.meta.env.VITE_BASE_API_URL}/${import.meta.env.VITE_API_URL_VERSION}/${
			import.meta.env.VITE_API_LIST_GENRE
		}`
	);
	url.searchParams.append('api_key', String(import.meta.env.VITE_API_KEY));
	url.searchParams.append('language', locale.toLocaleLowerCase());

	return url.toString();
}

function fetchAll(): Promise<Genre[]>[] {
	let result: Promise<Genre[]>[] = [];
	locales.forEach((locale) => {
		result.push(
			fetch(buildUrl(locale))
				.then((response) => {
					return response.json() as Promise<ResponseJSON>;
				})
				.then((response) => {
					return response.genres;
				})
		);
	});

	return result;
}

async function load(): Promise<void> {
	
	const genres = get({subscribe})
	if (genres.isLoaded){
		return Promise.resolve()
	}
	const result = await Promise.all(fetchAll());

	let data = {
		isLoaded: true,
		data: {}
	};

	locales.forEach((locale, index) => {
		data.data[locale] = result[index];
	});

    set(data as GenreStore)

    return Promise.resolve()
}

export default {
	subscribe,
	load
}
