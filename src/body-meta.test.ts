import {
	encode,
	decode,
} from './body-meta';

describe('body-meta', () => {
	describe('encode', () => {
		it('should encode', () => {
			expect(encode({
				body: 'some\nbody',
				string: 'some data',
				number: 123,
			})).toEqual(`some
body

string: "some data"
number: 123`);

			expect(encode({
				some: 'data',
			})).toEqual(`\n\nsome: "data"`);
		});
	});

	describe('decode', () => {
		it('should decode', () => {
			expect(decode(`some
body


string: "some data"
number: 123`)).toEqual({
				body: 'some\nbody',
				string: 'some data',
				number: 123,
			});

			expect(decode(`some
body
meta: data`)).toEqual({
				body: 'some\nbody',
				meta: 'data',
			});
		});
	});
});
