'use strict'

const test = require('ava')
const uuid = require('crypto').randomUUID

const aggregateDurations = require('../../src/aggregations/aggregateDurations')
const intervals = require('../../src/constants/intervals')
const createDate = require('../../src/utils/createDate')

test('return aggregation', (t) => {
	const result = aggregateDurations(uuid(), intervals.INTERVALS_DAILY, 14, createDate())

	t.true(Array.isArray(result))
})