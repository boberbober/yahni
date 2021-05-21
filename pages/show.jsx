
import React from 'react'

import List from '../components/List'
import getServerSidePropsGenerator from '../utils/gsspGenerator.js'


export default function ShowStories() {
	return <List type='show' />
}

export const getServerSideProps = getServerSidePropsGenerator('show')
