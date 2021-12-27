import { writable } from 'svelte/store';
import type { Credit, CreditStore, ResponseJSON } from '$lib/Interfaces/credit';

const { subscribe, set } = writable<CreditStore>(initData());

function initData() {
	const data = {
		isLoaded: false,
		data: []
	};

	return data as CreditStore;
}

function buildUrl(id: Number): string {
	const url = new URL(
		`${import.meta.env.VITE_BASE_API_URL}/${import.meta.env.VITE_API_URL_VERSION}/${
			import.meta.env.VITE_API_CREDITS
		}/${id}/credits`
	);
	url.searchParams.append('api_key', String(import.meta.env.VITE_API_KEY));
	return url.toString();
}

function fetchByID(id: Number): Promise<Credit[]> {
	const result = fetch(buildUrl(id))
		.then((response) => {
			return response.json() as Promise<ResponseJSON>;
		})
		.then((response) => {
			return response.cast;
		});

	return result;
}

async function load(id: Number): Promise<void> {
	const result = await fetchByID(id);

	let data = {
		isLoaded: true,
		data: result
	};

	set(data as CreditStore);

	return Promise.resolve();
}

export default {
	subscribe,
	load
};
