import type { localeType } from '$lib/i18n';

export type Genre = {
	id: number;
	name: string;
};

export type GenreStore = { isLoaded: boolean; data: Record<localeType, Genre[]> };

export type ResponseJSON = {
	genres: Genre[];
};

