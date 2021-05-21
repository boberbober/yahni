
import React from 'react'

import List from '../components/List'
import getServerSidePropsGenerator from '../utils/gsspGenerator.js'


export default function NewStories() {
	return <List type='new' />
}

export const getServerSideProps = getServerSidePropsGenerator('new')
