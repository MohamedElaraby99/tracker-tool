'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID

const aggregateTopRecords = require('../../src/aggregations/aggregateTopRecords')
const createDate = require('../../src/utils/createDate')

test('return aggregation', (t) => {
	const result = aggregateTopRecords(uuid(), [ 'osName', 'osVersion' ], createDate())

	t.true(Array.isArray(result))
})