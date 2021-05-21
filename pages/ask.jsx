
import React from 'react'

import List from '../components/List'
import getServerSidePropsGenerator from '../utils/gsspGenerator.js'


export default function AskStories() {
	return <List type='ask' />
}

export const getServerSideProps = getServerSidePropsGenerator('ask')
