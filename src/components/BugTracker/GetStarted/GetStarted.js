import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Logo from '../../UI/Logo/Logo.js';

const getStarted = ( props )=>{
	let getStarted = { to: '/signup' };
	return (
		<div>
			<Logo />
			<h2>Where talents work with clients</h2>
			<p>Work on projects, fix bugs and manage features request.</p>
			<Button link={getStarted}>Get started</Button>
			<br />
			<Link to='/lists'>Lists</Link>
		</div>
	);
}
export default getStarted;