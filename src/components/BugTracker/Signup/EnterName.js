import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import swal from '@sweetalert/with-react';

import styles from './Signup.module.css';
import Logo from '../../UI/Logo/Logo';
import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import FormValidation from '../../../services/FormValidation';
import * as actions from '../../../store/actions/index';

class EnterName extends Component {
	state={
		formData:{
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'name',
					placeholder: 'Your Name'
				},
				elementTitle: 'Name',
				elementName: 'name',
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		showLoader: false,
		redirect: false
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
		    		name: this.state.formData.name.value
		    	});
    	this.props.onSubmitName(fd);
		this.timeout = setTimeout(()=>{
	    	this.handleContinue();
		}, 2500);
        /*AuthService.updateName(fd).then(response=>{
        }, error=>{
    		this.setState({ error: true });
        });*/
    }
	handleContinue = () =>{
		swal({
			text: 'Name change',
			icon: 'success',
			content:(
				<div>
					<Logo className={styles.Logo} withOutLink={true} />
					<h2>Your name has successfully been updated</h2>
					<p>You can now view your desired list.</p>
				</div>
			)
		}).then(ok=>{
			if(ok){
				this.setState({ redirect: true, showLoader: false});
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
				<h2>Just your name</h2>
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
        onInit: ()=>dispatch(actions.updateNameInit()),
        onSubmitName: (user)=>dispatch(actions.updateNameRequest(user))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EnterName);