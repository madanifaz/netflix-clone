import { derived } from 'svelte/store';
import movies from '$lib/Data/MovieStore';
import { locale } from '$lib/i18n';
import type { Movie } from '$lib/Interfaces/movie';
import uniqueArray from '$lib/Helper/uniqueArray';
import shuffleArray from '$lib/Helper/suffleArray';

export const moviesFilteredByGenreID = derived(
	[locale, movies],
	([$locale, $movies]) =>
		(genreID: number): Movie[] => {
			const result = uniqueArray(
				$movies.data[$locale].filter((movie: Movie) => {
					return movie.genre_ids.includes(genreID) && !movie.trending;
				})
			);
			return shuffleArray(result);
		}
);

export const moviesByTrending = derived([locale, movies], ([$locale, $movies]) => {
	const result = $movies.data[$locale].filter((movie: Movie) => {
		return movie.trending;
	});
	return result;
});

export const moviesSortedByRating = derived(
	[locale, movies],
	([$locale, $movies]) =>
		(limit: number): Movie[] => {
			const result = uniqueArray(
				$movies.data[$locale].sort(function (a: Movie, b: Movie) {
					return Number(b.vote_average) - Number(a.vote_average);
				})
			).slice(0, limit);
			return shuffleArray(result);
		}
);

export const movieBySlug = derived(
	[locale, movies],
	([$locale, $movies]) =>
		(slug: string): Movie|undefined => {
			const result = $movies.data[$locale].find((movie: Movie) => {
				return movie.slug === slug;
			});
			return result;
		}
);
