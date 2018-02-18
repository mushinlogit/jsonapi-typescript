import { suite, test, slow, timeout, only } from 'mocha-typescript';
import { assert } from 'chai';
import { check, checkDirectory } from 'typings-tester';
import { join } from 'path';
import { assertTsThrows } from '../helpers';
import * as JSONAPI from '../../index';

interface CustomTestInterface {
	property1: number;
	property2: string;
}

@suite('Resource objects')
class ResourceTests {
	@test('Resources must have a "type"')
	async hasType() {
		const o: JSONAPI.ResourceObject = {
			type: 'abc',
			id: '1',
		};
		assert.ok(o.type);
	}

	@test('A few examples of valid resource objects')
	validResourceObjects() {
		let o: JSONAPI.ResourceObject;
		o = {
			type: 'articles',
			id: '1',
			attributes: {
				title: 'Rails is Omakase'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/1/relationships/author',
						related: 'http://example.com/articles/1/author'
					},
					data: { type: 'people', id: '9' }
				}
			},
			links: {
				self: 'http://example.com/articles/1'
			},
			meta: {
				key: 'value'
			}
		};
	}

	@test('Typescript checks custom resource attribute objects')
	validCustomAttributeResourceObjects() {
		let o: JSONAPI.ResourceObject<CustomTestInterface>;
		o = {
			type: 'articles',
			id: '1',
			attributes: {
				property1: 1,
				property2: 'abc',
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/1/relationships/author',
						related: 'http://example.com/articles/1/author'
					},
					data: { type: 'people', id: '9' }
				}
			},
			links: {
				self: 'http://example.com/articles/1'
			},
			meta: {
				key: 'value'
			}
		};

		assert.ok(o);
		assert.ok(o.attributes && o.attributes.property1);
		assert.ok(o.attributes && o.attributes.property2);
	}
}
