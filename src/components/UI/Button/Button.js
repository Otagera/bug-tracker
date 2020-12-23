import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

const button = ( props )=>{
	let button = <button onClick={props.clicked} className={styles.Button}>
					{props.children}
				</button>;
	if(props.link){ 
		button = 
			<Link to={props.link.to}>
				<button onClick={props.clicked} className={styles.Button}>
					{props.children}
				</button>
			</Link>
	}
	if(props.addLink){ 
		button = 
			<Link to={props.addLink.to}  className={styles.Add}>
				<div className={styles.Add_Company}>
				</div>
			</Link>
	}
	return (button);
}
export default button;