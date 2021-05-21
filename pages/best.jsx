
import React from 'react'

import List from '../components/List'
import getServerSidePropsGenerator from '../utils/gsspGenerator.js'


export default function BestStories() {
	return <List type='best' />
}

export const getServerSideProps = getServerSidePropsGenerator('best')
