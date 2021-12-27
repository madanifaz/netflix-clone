import type { localeType } from '$lib/i18n';

export type Movie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: Number[];
    genre_list?: string[];
	id: Number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: 4420.039;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: Number;
	vote_count: Number;
	media_type?: string;
	trending?: boolean;
    slug?: string;
};

export type MovieStore = { isLoaded: boolean; data: Record<localeType, Movie[]> };

export type ResponseJSON = {
	page: number;
	results: Movie[];
};
