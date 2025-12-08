'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID

const aggregateActiveVisitors = require('../../src/aggregations/aggregateActiveVisitors')
const createDate = require('../../src/utils/createDate')

test('return aggregation', (t) => {
	const result = aggregateActiveVisitors(uuid(), createDate())

	t.true(Array.isArray(result))
})