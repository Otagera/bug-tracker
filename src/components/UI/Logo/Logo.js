import React from 'react';

import img from '../../../assets/images/bugtracker-logo.png';

const logo = ( props )=>{
	const { ...rest } = props;
	return (
			<img src={img} alt="Logo" {...rest}/>
		);
}
export default logo;