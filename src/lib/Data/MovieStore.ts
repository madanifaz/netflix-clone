import { writable } from 'svelte/store';
import type { Movie, MovieStore, ResponseJSON } from '$lib/Interfaces/movie';
import { locale, locales } from '$lib/i18n';
import type { GenreStore, Genre } from '$lib/Interfaces/genre';

const { subscribe, set, update } = writable<MovieStore>(initData());

function initData() {
	const data = {
		isLoaded: false,
		data: {}
	};

	locales.forEach((locale) => {
		data.data[locale] = [];
	});

	return data as MovieStore;
}

function titleToSlug(title: string): string {
	return title.replace(/\s+/g, '-');
}

function injectGenres(genres: GenreStore) {
	update((movies) => {
		locales.forEach((locale) => {
			movies.data[locale].forEach((movie: Movie) => {
				movie.genre_ids.forEach((id: Number) => {
					const genre = genres.data[locale].find((genre: Genre) => {
						return genre.id == id;
					});
					if (genre.name) {
						movie.genre_list.push(genre.name);
					}
				});
			});
		});

		return movies;
	});
}
function castResponseData(response: Movie[][]): MovieStore {
	let data = {
		isLoaded: true,
		data: {}
	};

	locales.forEach((locale) => {
		data.data[locale] = [];
	});

	response.forEach((movies, index) => {
		// add slug and image url
		movies.map((movie) => {
			movie.slug = titleToSlug(movie.title);
			movie.backdrop_path = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
			movie.poster_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
			movie.genre_list = [];
			if (movie.overview == ''){
				movie.overview = '(Summary Indonesia Tidak Ditemukan)'
			}
		});

		let locale = locales[index % locales.length];
		data.data[locale].push(...movies);
	});

	return data as MovieStore;
}

function buildUrl(locale: string, path: string | boolean): URL {
	const url = new URL(
		`${import.meta.env.VITE_BASE_API_URL}/${import.meta.env.VITE_API_URL_VERSION}/${path}`
	);
	url.searchParams.append('api_key', String(import.meta.env.VITE_API_KEY));
	url.searchParams.append('language', locale.toLocaleLowerCase());

	return url;
}

function fetchTrending(): Promise<Movie[]>[] {
	let result: Promise<Movie[]>[] = [];

	locales.forEach((locale) => {
		result.push(
			fetch(buildUrl(locale, import.meta.env.VITE_API_LIST_TRENDING).toString())
				.then((response) => {
					return response.json() as Promise<ResponseJSON>;
				})
				.then((response) => {
					response.results.map((movie) => (movie.trending = true));
					return response.results;
				})
		);
	});
	return result;
}

function fetchByGenres(genreIDS: Number[]) {
	let result: Promise<Movie[]>[] = [];
	locales.forEach((locale) => {
		genreIDS.forEach((genreID) => {
			const url = buildUrl(locale, import.meta.env.VITE_API_LIST_MOVIE_BY_GENRE);
			// url.searchParams.append('sort_by', 'popularity.desc');
			url.searchParams.append('with_genres', String(genreID));
			result.push(
				fetch(url.toString())
					.then((response) => {
						return response.json() as Promise<ResponseJSON>;
					})
					.then((response) => {
						response.results.map((movie) => (movie.trending = false));
						return response.results;
					})
			);
		});
	});

	return result;
}

async function load(genreIDS: Number[]) {
	const job = fetchTrending().concat(fetchByGenres(genreIDS));
	const result = await Promise.all(job);
	set(castResponseData(result));
	return Promise.resolve();
}

export default {
	subscribe,
	injectGenres,
	load,
	buildUrl
};
