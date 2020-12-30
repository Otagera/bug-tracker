import React from 'react';
import { Link } from 'react-router-dom';

import img from '../../../assets/images/bugtracker-logo.png';
const logo = ( props )=>{
	const { withOutLink, ...rest } = props;
	if(withOutLink){
		return (
			<img src={img} alt="Logo" {...rest}/>
		);
	}else {
		return (
				<Link to='/'>
					<img src={img} alt="Logo" {...rest}/>				
				</Link>
			);
	}
}
export default logo;