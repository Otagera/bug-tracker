import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';

const button = ( props )=>{
	const { styleParent, clicked, buttonType, enable } = props;
	let localEnable = enable;
	if(enable === undefined){ localEnable = true; }
	let disable = (localEnable)? false: true;
	let button = null;
	let buttonStyle = [styles.Button];
	if(styleParent && styleParent.length > 0){
		buttonStyle = buttonStyle.concat(styleParent);
	}
	switch (buttonType) {
		case 'link':
			button = <Link to={props.link.to}>
						<button onClick={clicked} className={buttonStyle.join(' ')}>
							{props.children}
						</button>
					 </Link>
			break;
		case 'addLink':
			button =  <Link to={props.addLink.to}  className={styles.Add}>
						<div onClick={clicked} className={styles.Add_Div}>
						</div>
					  </Link>
					  break;
		case 'add':
			button =  <div onClick={clicked} className={styles.Add_Div}></div>
					  break;
		default:
			button = <button
						onClick={clicked}
						className={buttonStyle.join(' ')}
						disabled={disable} >
						{props.children}
					 </button>;
			break;
	}
	return (button);
}
export default button;