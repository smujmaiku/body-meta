/*!
 * Body Meta <https://github.com/smujmaiku/body-meta>
 * Copyright(c) 2016-2019 Michael Szmadzinski
 * MIT Licensed
 */

const flatten = require('flat');
const unflatten = flatten.unflatten;

/**
 * Encode to string
 * @param {Object} data
 * @param {String} data.body
 * @returns {String}
 */
function encode(data) {
	const body = data.body || '';
	const flatData = flatten(data);
	delete flatData.body;

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
function decode(body) {
	const data = {};
	const rows = body.split('\n');

	while (body.length > 0) {
		const row = rows.pop();
		if (row === '') break;

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
		if (row !== '') {
			rows.push(row);
			break;
		};
	}

	data.body = rows.join('\n');

	return unflatten(data);
}

exports.encode = encode;
exports.decode = decode;
