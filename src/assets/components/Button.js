import React from 'react'

const Button = ({ children, className, onClick, title, ariaLabel }) => (
	<button className={className} onClick={onClick} title={title} aria-label={ariaLabel}>
		{children}
	</button>
)


export default Button