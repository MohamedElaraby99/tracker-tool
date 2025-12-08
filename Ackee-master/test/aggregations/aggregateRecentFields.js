'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID

const aggregateRecentRecords = require('../../src/aggregations/aggregateRecentRecords')

test('return aggregation', (t) => {
	const result = aggregateRecentRecords(uuid(), [ 'osName', 'osVersion' ])

	t.true(Array.isArray(result))
})