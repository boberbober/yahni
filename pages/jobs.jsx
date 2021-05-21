
import React from 'react'

import List from '../components/List'
import getServerSidePropsGenerator from '../utils/gsspGenerator.js'


export default function JobStories() {
	return <List type='job' />
}

export const getServerSideProps = getServerSidePropsGenerator('job')
