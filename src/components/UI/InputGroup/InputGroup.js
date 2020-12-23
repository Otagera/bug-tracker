import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './InputGroup.module.css';

class InputGroup extends Component{
	state = {
		[this.props.name]: this.props.value
	}

	handleChange = (event)=> {
		let type = 'value';
		if(event.target.type === 'checkbox'){
			type = 'checkbox';
		} else if(event.target.type === 'file'){
			type = 'files';
		}
		
		const value = event.target[type];
		const name = event.target.name;
		this.setState({
			[name]: value
		});
		this.props.handleInputValue(value, this.props.name);
	}

	reset = ()=>{
		this.setState({ inputValue: '' });
	}

	render(){
		const { 
			invalid, shouldValidate, touched, elementType,
			elementConfig, name, passwordType, handleShowPassword,
			passwordRevealed, title, classes
		} = this.props;
		let inputElement = null;
		let inputClasses = [classes, styles.Input];
		let icon = null;
		let validError = null;
		let label = null;
		if(invalid && shouldValidate && touched){
			inputClasses.push('Invalid');
		}
		switch (elementType) {
			case ('input'):
				inputElement = <input
									className={inputClasses.join(' ')}
									{...elementConfig}
									value={this.state[name]}
									onChange={this.handleChange}
									name={name} />;
				break;
			case ('textarea'):
				inputElement = <textarea
									className={inputClasses.join(' ')}
									{...elementConfig}
									value={this.state[name]}
									onChange={this.handleChange}
									name={name}
									cols={27}
									rows={40} />;
				break;
			case ('select'):
				inputElement = <select
									className={inputClasses.join(' ')}
									value={this.state[name]}
									onChange={this.handleChange}
									name={name} >
									<option value='' defaultValue></option>
									{
										elementConfig.options.map(option=>(
											<option key={option.value} value={option.value}>{option.displayValue}</option>
										))
									}
								</select>
				break;
			case ('file'):
				inputElement = <input
									type="file"
									ref={this.props.ref}
									className={inputClasses.join(' ')}
									name={name}
									onChange={this.handleChange} />
				break;
			case ('date'):
				inputElement = <input
									type="date"
									className={inputClasses.join(' ')}
									name={name}
									value={(this.props.value)? this.props.value: new Date().toISOString().substr(0, 10)}
									onChange={this.handleChange} />
				break;
			case ('submit'):
				inputElement = <input
									type="submit"
									className={inputClasses.join(' ')}
									name={name}
									value={this.props.value}
									disabled={this.props.disabled} />
				break;
			default:
				inputElement = <input
									className={inputClasses.join(' ')}
									{...elementConfig}
									value={this.state[name]}
									onChange={this.handleChange}
									name={name} />;
				break;
		}
		if(passwordType){
			icon = <span onClick={handleShowPassword.bind(this, name)}>
						<span className='IconSpan'>
							<FontAwesomeIcon
								icon={(passwordRevealed)? faEye: faEyeSlash}
								className='EyeIcon'/>
						</span>
					</span>
		}
		if(invalid && shouldValidate && touched){
			let text = null;
			if(shouldValidate.required) {
				text = `${name} is required`;
				if(this.state[name] && shouldValidate.email) {
					text = `That is not a valid email`;
				} else if(this.state[name] && shouldValidate.url) {
					text = `Please enter a valid URL`;
				} else if(this.state[name] && shouldValidate.confirmPassword) {
					text = `Be sure that ${name} matches the Password entered`;
				} else if(this.state[name] && shouldValidate.minLength) {
					text = `${name} should be more than ${shouldValidate.minLength} characters`;
				} else if(this.state[name] && shouldValidate.maxLength) {
					text = `${name} should be less than ${shouldValidate.maxLength} characters`;
				} else if(this.state[name] && shouldValidate.minLength && shouldValidate.maxLength) {
					text = `${name} should be less than ${shouldValidate.minLength} and more than ${shouldValidate.maxLength} characters`;
				}
			}else {				
				if(this.state[name] && shouldValidate.email) {
					text = `That is not a valid email`;
				} else if(this.state[name] && shouldValidate.url) {
					text = `Please enter a valid URL`;
				} else if(this.state[name] && shouldValidate.confirmPassword) {
					text = `Be sure that ${name} matches the Password entered`;
				} else if(this.state[name] && shouldValidate.minLength) {
					text = `${name} should be more than ${shouldValidate.minLength} characters`;
				} else if(this.state[name] && shouldValidate.maxLength) {
					text = `${name} should be less than ${shouldValidate.maxLength} characters`;
				} else if(this.state[name] && shouldValidate.minLength && shouldValidate.maxLength) {
					text = `${name} should be less than ${shouldValidate.minLength} and more than ${shouldValidate.maxLength} characters`;
				}
			}
			validError = <span>
							<span className={styles.Validate_error}>
								<span className={styles.Validate_error_text}>
									<FontAwesomeIcon icon={faExclamationCircle}/>
									{text}
								</span>
							</span>
						</span>
		}
		if(title){
			label = <label>{title}</label>;
		}
		return(
			<div className={[styles.FlexRow, styles.InputGroup].join(' ')}>
				{label}
				{validError}
				{inputElement}
				{icon}
				{/* <button>Add</button> */}
			</div>
		);
	}
}

export default InputGroup;

/*
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
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Your Password'
			},
			elementTitle: 'Password',
			elementName: 'password',
			passwordRevealed: false,
			passwordType: true,
			value: '',
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		},
		submit: {
			elementType: 'submit',
			elementConfig: {
				type: 'submit'
			},
			elementName: 'submit',
			value: 'Submit',
			validation: {
				required: true,
				confirmPassword: true
			},
			valid: true
		}
	},
	form: React.createRef()


	handleShowPassword = (name)=>{
		let formData = { ...this.state.formData };
		if(formData[name].passwordRevealed){
			formData[name].elementConfig.type = 'password';
		}else {
			formData[name].elementConfig.type = 'text';
		}
		formData[name].passwordRevealed =!formData[name].passwordRevealed;

		this.setState({ formData: formData });
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


	let formElementArray = [];
	for(let key in this.state.formData){
		formElementArray.push({
			id: key,
			config: this.state.formData[key]
		});
	}

	{
		formElementArray.map((formElement)=>{
			const { id, config } = formElement;
			return (
				<InputGroup
					key={id}
					classes={config.elementName}
					name={config.elementName}
					title={config.elementTitle}
					elementType={config.elementType}
					elementConfig={config.elementConfig}
					value={config.value}
					passwordRevealed={config.passwordRevealed}
					passwordType={config.passwordType}
					invalid={!config.valid}
					disabled={!this.state.formIsValid}
					shouldValidate={config.validation}
					touched={config.touched}
					handleInputValue={this.handleInputValue}
					handleShowPassword={this.handleShowPassword}
				/>
			)}
		)
	}
*/