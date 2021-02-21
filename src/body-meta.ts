/*!
 * Body Meta <https://github.com/smujmaiku/body-meta>
 * Copyright(c) 2021 Michael Szmadzinski
 * MIT Licensed
 */

import { flatten, unflatten } from 'flat';

/**
 * Encode to string
 * @param {Object} data
 * @param {String} data.body
 * @returns {String}
 */
export function encode<T = any>(data: T): string {
	const {
		body = '',
		...flatData
	} = flatten(data);

	const bodyData = Object.keys(flatData)
		.map(key => `${key}: ${JSON.stringify(flatData[key])}`)
		.join('\n');

	return body + '\n\n' + bodyData;
}

/**
 * Decode string
 * @param {String} body
 * @returns {Object}
 */
export function decode<T = any>(body: string): T {
	const data: any = {};
	const rows = body.split('\n');

	while (body.length > 0) {
		const row = rows.pop();
		if (row === '' || row === undefined) break;

		const colon = row.indexOf(':');
		if (colon < 0) {
			rows.push(row);
			break;
		}

		const key = row.slice(0, colon).trim();
		const value = row.slice(colon + 1);
		try {
			data[key] = JSON.parse(value);
		} catch (e) {
			data[key] = value.trim();
		}
	}

	// Remove extra blank lines
	while (true) {
		const row = rows.pop();
		if (row !== '' && row !== undefined) {
			rows.push(row);
			break;
		}
	}

	data.body = rows.join('\n');

	return unflatten(data) as T;
}
