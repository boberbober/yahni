
import React from 'react'
import cn from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'
import Link from 'next/link'

import Time from './Time'
import fetchItem from '../utils/fetchItem'

import { 
	openStoryIdAtom, 
	settingsAtom,
	openedStorySelector,
	storyAtom,
	lastVisitSelector,
} from '../utils/atoms'

const urlDomain = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function Snippet({ storyId }) {

	const lastVisit = useRecoilValue(lastVisitSelector)
	const [story, setStory] = useRecoilState(storyAtom(storyId))
	const openStoryId = useRecoilValue(openStoryIdAtom)
	const { linkNewTab, hideStoryItems } = useRecoilValue(settingsAtom)
	const openedStory = useRecoilValue(openedStorySelector(storyId))
	
	React.useEffect(() => {
		if (story === null)
			fetchItem(storyId, setStory)
	}, [story])

	if (!story) {
		return <li className='snippet sLoading'>
			{ !hideStoryItems.score &&
				<span className='sScore'>_</span> }
			{ !hideStoryItems.comments &&
				<button className='sComments'>_</button> }
			<span className='sLink'>
				<em className='loading'>...</em>
			</span>
			{ (!hideStoryItems.date || !hideStoryItems.user) &&
				<p className='sSub'>
					<em className='loading'>...</em>
				</p> }
		</li>
	}
	
	return <li 
		className={cn(`snippet s-${story.type}`, {
			sNew: !!lastVisit && lastVisit < story.time,
			sOpen: openStoryId === storyId,
			noScore: hideStoryItems.score,
			noComments: hideStoryItems.comments,
		})}
	>

		{ story.type !== 'job' && <>
			
			{ !hideStoryItems.score &&
				<a className='sScore'
					target={linkNewTab ? '_blank' : '_self'}
					href={`https://news.ycombinator.com/item?id=${storyId}`}
				>{ story.score }</a>
			}

			{ !hideStoryItems.comments &&
				<Link href={`#${storyId}`}>
					<a className={cn('sComments', {
							scOpened: !!openedStory,
							scHasNew: openedStory?.desc < story.descendants,
						})}
					>{ story.descendants }</a>
				</Link>
			}

		</>}


		{ story.url
			?	<a className='sLink'
					target={linkNewTab ? '_blank' : '_self'}
					rel='noopener'
					href={story.url ?? `https://news.ycombinator.com/item?id=${storyId}`}
				>
					<span className='sTitle'>{ story.title }</span>
					{ (story.url && !hideStoryItems.domain) && <small className='sUrl'>({ urlDomain(story.url) })</small> }
				</a>
			:	<Link href={`#${storyId}`}>
					<a className='sLink'>{ story.title }</a>
				</Link>
		}


		{ (!hideStoryItems.date || !hideStoryItems.user) &&
			<p className='sSub'>

				{ !hideStoryItems.date && <>
					<Time time={story.time} />{' '}
				</>}

				{ !hideStoryItems.user &&
					<span className='sBy'>
						by <em>{ story.by }</em>
					</span>
				}

			</p>
		}

	</li>
}