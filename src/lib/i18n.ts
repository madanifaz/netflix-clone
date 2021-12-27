/**
 * Simple i18n Translation it simply devrived store that depend on locale store
 * and map the keys to object of dict translation
 * probably need to be updated to only load language that used by user asynchronously
 */
import { derived, writable } from 'svelte/store';
import delve from '$lib/Helper/delve';

import en from '../../locales/en.json';
import id from '../../locales/id.json';

// Translation Object
const translations = {
	en: en,
	id: id
};

// locales Types must same sequence with translation
export type localeType = 'en' | 'id'

function translate(locale: string, key: string, defaultText: string): string {
	let text: string | undefined = delve(translations[locale.toLocaleLowerCase()], key);

	if (!text) {
		text = defaultText;
	}

	return text;
}

/**
 * writeable store, hold current language
 */
export const locale = writable<string>('En');

/**
 * Static list of avaliable locales
 * Capatilize to make it easy on Views
 */
export const locales = Object.keys(translations).map((i) => i.charAt(0).toUpperCase() + i.slice(1));

/**
 * Deprived store with $locale as depencicy
 * @param {string} key lookup key object format ex 'page.home.title'
 * @param {string} fallbackValue if key not found ex 'Watch Now'
 * Return value from translations object if present
 * if not will return default value
 *
 * Example
 * ```
 * 	$_('page.home.title', 'Watch Now')
 * ```
 */
export const _ = derived(
	locale,
	($locale) =>
		(key: string, defaultText = '') =>
			translate($locale, key, defaultText)
);
