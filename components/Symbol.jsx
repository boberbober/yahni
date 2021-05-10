
import React from 'react'


export default function Symbol({ 
	id, 
	label,
	className = ''
}) {
	return <svg 
		className={`symbol ${className}`}
		height='1.25em' 
		width='1.25em' 
		aria-label={label || id} 
		aria-hidden={!!label}
		title={label || id}		
		alt={label || id}		
	>
		<use xlinkHref={`#${id}Symbol`} />
	</svg>
}
