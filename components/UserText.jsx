
import React from 'react'


function fixCommentHtml(text) {
	return text.replace(/(^|<p>|<i>)&gt; ?/g, '<p class="cQuot">').replace(/`(.+?)`/g, `<code>$1</code>`)
}


export default function UserText({ text }) {
	return <div 
		className='userText'
		dangerouslySetInnerHTML={{__html: fixCommentHtml(text)}} 
	/>
}