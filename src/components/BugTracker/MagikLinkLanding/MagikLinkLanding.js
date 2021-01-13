import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import Logo from '../../UI/Logo/Logo';
import Loader from '../../UI/Loader/Loader';
import * as actions from '../../../store/actions/index';

class MagikLinkLanding extends Component {
	state = {
		showLoader: true,
		error: false,
		errorMsg: ''
	}
	componentDidMount(){
		this.setState({ showLoader: true });
		let fd = JSON.stringify({
			token: this.props.match.params.token
		});
		this.props.onSubmitLink(fd);
	}
    static getDerivedStateFromProps(props, state){
        if(props.successfull){
            return { redirectPath: props.redirectPath };
        }else if(props.errorMsg){
            return { showLoader: false, errorMsg: props.errorMsg, error: true };
        }
        return { errorMsg: '' };
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
const mapStateToProps = state =>{
	return {
        successfull: state.user.authTokenSuccess,
        redirectPath: state.user.redirectPath,
        errorMsg: state.user.errorMsg
	};
}
const mapDispatchToProps = dispatch =>{
    return {
        //onInit: ()=>dispatch(actions.updateNameInit()),
        onSubmitLink: (user)=>dispatch(actions.authenticateTokenRequest(user))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MagikLinkLanding));