import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';

import styles from './Login.module.css';
import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import Logo from '../../UI/Logo/Logo';
import FormValidation from '../../../services/FormValidation';
import * as actions from '../../../store/actions/index';

class Login extends Component{
	state={
		formData:{
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				elementTitle: 'Email',
				elementName: 'email',
				value: 'otagera@gmail.com',
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false
			}
		},
		showLoader: false,
		redirect: false
	}
    componentDidMount(){
        this.props.onInit();
    }
	componentWillUnmount () {
		if (this.timeout) clearTimeout(this.timeout);
	}
    static getDerivedStateFromProps(props, state){
        if(props.successfull){
            return { submitClicked: false };
        }else if(props.errorMsg){
            return { submitClicked: false, errorMsg: props.errorMsg };
        }
        return { errorMsg: '' };
    }
	handleInputValue = (value, name)=>{
		let formData = { ...this.state.formData };
		formData[name].value = value;
		formData[name].valid = FormValidation.checkValidity(formData[name].value, formData[name].validation);
		formData[name].touched = true;

		let formIsValid = true;
		for(let inputIdentifiers in formData){
			formIsValid = formData[inputIdentifiers].valid && formIsValid;
		}

		this.setState({ formData: formData, formIsValid: formIsValid });
	}
    handleSubmit = (e)=>{
    	e.preventDefault();
		this.setState({ showLoader: true });
    	let fd = JSON.stringify({
		    		email: this.state.formData.email.value
		    	});
    	this.props.onSubmitLogin(fd);
		this.timeout = setTimeout(()=>{
	    	this.handleSuccessfulContinue();
		}, 2500);
    }
	handleSuccessfulContinue = () =>{
		let icon = 'success';
		if(this.props.errorMsg){
			icon = 'error';
		}
		swal({
			text: 'Login',
			icon: icon,
			content:(
				<div> <p>
					{(this.props.errorMsg)? this.props.errorMsg:
						`Click on the special link sent to your ${this.state.formData.email.value}.`
					}
				</p> </div>
			)
		}).then(ok=>{
			if(ok){
				this.setState({ redirect: true, showLoader: false});
			}else{
				this.setState({ showLoader: false});
			}
		});
	}
	render(){
		const { formData, showLoader, redirect } = this.state;
		let redirecter = null;
		const buttonStyle = [styles.Button];
		let formElementArray = [];
		for(let key in formData){
			formElementArray.push({
				id: key,
				config: formData[key]
			});
		}
		if(redirect){ redirecter = <Redirect to='/' />}
		return (
			<div>
				{redirecter}
				<Logo className={styles.Logo} />
				<h2>Log in to continue</h2>
				<p>A special link would be sent to your email</p>
				{
					formElementArray.map((formElement)=>{
						const { id, config } = formElement;
						return (
							<InputGroup
								key={id}
								classes={config.elementName}
								name={config.elementName}
								elementType={config.elementType}
								elementConfig={config.elementConfig}
								value={config.value}
								invalid={!config.valid}
								disabled={!this.state.formIsValid}
								shouldValidate={config.validation}
								touched={config.touched}
								handleInputValue={this.handleInputValue}
							/>
						)}
					)
				}
				<Button
				 	clicked={this.handleSubmit}
				 	styleParent={buttonStyle}
				 	enable={!showLoader} >
					{(showLoader)?
						<Loader width={`20`} />:
						`Continue`}
				</Button>
				<p>Need an account? <Link to='/signup'>Sign Up</Link></p>
				<Link to='/'>Home</Link>
			</div>
		);
	}
}
const mapStateToProps = state =>{
	return {
        successfull: state.user.loginSuccess,
        errorMsg: state.user.errorMsg
	};
}
const mapDispatchToProps = dispatch =>{
    return {
        onInit: ()=>dispatch(actions.loginInit()),
        onSubmitLogin: (user)=>dispatch(actions.loginRequest(user))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);