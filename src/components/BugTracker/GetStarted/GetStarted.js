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
			<span className={styles.Button}>
				<Button link={getStarted} buttonType={'link'}>Get started</Button>				
			</span>
			<br />
			<Link to='/lists' className={styles.Link}>Lists</Link>
			<Link
				to='/sweet/token/5feb038fb3f7d7460600ffa7af2d944248d52a1d0cf02' >
				Magik Link Landing
			</Link>
		</div>
	);
}
export default getStarted;