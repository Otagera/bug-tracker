import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import Logo from '../../UI/Logo/Logo';
import FormValidation from '../../../services/FormValidation';

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
				value: '',
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false
			}
		},
		showModal: false
	}
	handleInputValue = (value, name)=>{
		let formData = { ...this.state.formData };
		formData[name].value = value;
		formData[name].valid = FormValidation.checkValidity(formData[name].value, formData[name].validation, formData.password.value);
		formData[name].touched = true;

		let formIsValid = true;
		for(let inputIdentifiers in formData){
			formIsValid = formData[inputIdentifiers].valid && formIsValid;
		}

		this.setState({ formData: formData, formIsValid: formIsValid });
	}
	removeModal = () =>{
		this.setState({ showModal: false });
	}
	render(){
		const { formData, showModal } = this.state;
		let formElementArray = [];
		for(let key in formData){
			formElementArray.push({
				id: key,
				config: formData[key]
			});
		}
		return (
			<div>
				<Logo />
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
				<Button>Continue</Button>
				<p>Need an account? <Link to='/signup'>Sign Up</Link></p>
				<Link to='/'>Home</Link>
				<Modal
					show={showModal}
					modalClosed={this.removeModal}
					successfull={true}>
					<div>
						<h4>Log In</h4>
						<p>
							A magic link has been sent to your email.
							Please check your email and click on that link to continue.
						</p>
						<Button clicked={this.removeModal}>Okay</Button>
					</div>
				</Modal>
			</div>
		);
	}
}
export default Login;