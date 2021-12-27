import { writable } from 'svelte/store';
import type { Company, CompanyStore, ResponseJSON } from '$lib/Interfaces/company';

const { subscribe, set } = writable<CompanyStore>(initData());

function initData() {
	const data = {
		isLoaded: false,
		data: []
	};

	return data as CompanyStore;
}

function buildUrl(id: Number): string {
	const url = new URL(
		`${import.meta.env.VITE_BASE_API_URL}/${import.meta.env.VITE_API_URL_VERSION}/${
			import.meta.env.VITE_API_CREDITS
		}/${id}`
	);
	url.searchParams.append('api_key', String(import.meta.env.VITE_API_KEY));
	return url.toString();
}

function fetchByID(id: Number): Promise<Company[]> {
	const result = fetch(buildUrl(id))
		.then((response) => {
			return response.json() as Promise<ResponseJSON>;
		})
		.then((response) => {
			return response.production_companies;
		});

	return result;
}

async function load(id: Number): Promise<void> {
	const result = await fetchByID(id);

	let data = {
		isLoaded: true,
		data: result
	};

	set(data as CompanyStore);

	return Promise.resolve();
}

export default {
	subscribe,
	load
};
