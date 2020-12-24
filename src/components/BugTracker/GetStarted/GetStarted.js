import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Logo from '../../UI/Logo/Logo.js';
import styles from './GetStarted.module.css';

const getStarted = ( props )=>{
	let getStarted = { to: '/signup' };
	return (
		<div className={styles.GetStarted}>
			<Logo className={styles.Logo} />
			<h2 className={styles.Heading}>Where talents work with clients</h2>
			<p className={styles.Text}>Work on projects, fix bugs and manage features request.</p>
			<div className={styles.Button}>
				<Button link={getStarted}>Get started</Button>				
			</div>
			<br />
			<Link to='/lists' className={styles.Link}>Lists</Link>
		</div>
	);
}
export default getStarted;