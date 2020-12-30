import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Logo from '../../UI/Logo/Logo';
import Loader from '../../UI/Loader/Loader';
import AuthService from '../../../services/AuthService';

class MagikLinkLanding extends Component {
	state = {
		showLoader: true,
		error: false,
		errorMsg: ''
	}
	componentDidMount(){
		//5feb038fb3f7d7460600ffa7af2d944248d52a1d0cf02
		this.setState({ showLoader: true });
		let fd = JSON.stringify({
			token: this.props.match.params.token
		});
		AuthService.authenticateToken(fd).then(response=>{
			if(response.data.data && response.data.data.type === 'signup'){
				this.setState({ showLoader: false, redirectPath: '/signup/enter-name' });
			}else if(response.data.data && response.data.data.type === 'login'){
				this.setState({ showLoader: false, redirectPath: '/get-started' });
			}else if(response.data.code === 401){
				this.setState({
					showLoader: false,
					error: true,
					errorMsg: 'Sorry token has expired'
				})
			}
		}, error=>{
			this.setState({ error: true, errorMsg: error });
		})
	}
	render(){
		const { showLoader, error, errorMsg, redirectPath } = this.state;
		let redirecter = null;
		let whatToDisplay = null;
		if(redirectPath){ redirecter = <Redirect to={redirectPath} />; }
		if(showLoader){ whatToDisplay = <Loader width={100} />; }
		else if(error){ whatToDisplay = <p>{errorMsg}</p>; }

		return (
			<div>
				{redirecter}
				<Logo />
				<h2>Authorizing</h2>
				{whatToDisplay}
			</div>
		);
	}
}
export default withRouter(MagikLinkLanding);