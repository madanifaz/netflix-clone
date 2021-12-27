/**
 * Delve function evaluate string with object notation to target object
 * @param {object} obj the object to delve into
 * @param {string} key fullkey to object eg: en.homepage.title
 * @returns {string|undifined} value of the object, return undifined if not found;
 */

export default function delve(obj: object, key: string): string | undefined {
	const keys = key.split('.');

	let currentObj = obj;

	for (let i = 0; i < keys.length; i++) {
		const partialKey = keys.slice(i, keys.length).join('.');
		if (partialKey in currentObj) {
			return currentObj[partialKey];
		}

		// delve deeper
		currentObj = currentObj[keys[i]];
	}

	// not found
	return undefined;
}
