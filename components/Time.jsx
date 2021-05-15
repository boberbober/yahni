
import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


export default function Time({ time }) {

	const dayTime = dayjs.unix(time)

	return <time dateTime={dayTime.toISOString()}>
		{ dayTime.fromNow() }
	</time>
}