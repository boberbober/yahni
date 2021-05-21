
import React from 'react'

import List from '../components/List'
import getServerSidePropsGenerator from '../utils/gsspGenerator.js'


export default function TopStories({ stories, snippets }) {
	return <List type='top' />
}


export const getServerSideProps = getServerSidePropsGenerator('top')
