'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID

const aggregateNewRecords = require('../../src/aggregations/aggregateNewRecords')

test('return aggregation', (t) => {
	const result = aggregateNewRecords(uuid(), [ 'siteReferrer' ])

	t.true(Array.isArray(result))
})