import React, { Component } from 'react';

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
    handleSubmit = (e)=>{
    	e.preventDefault();
		this.setState({ showLoader: true });
    	let fd = JSON.stringify({
		    		name: this.state.formData.name.value
		    	});
        /*AuthService.login(fd).then(response=>{
        	console.log(response);
			this.timeout = setTimeout(()=>{
		    	this.handleContinue();
			}, 2500);
        }, error=>{
    		this.setState({ error: true });
        });*/
    }
	handleContinue = () =>{
		swal({
			text: 'Login ',
			icon: 'success',
			content:(
				<div>
					<Logo className={styles.Logo} />
					<h2>Login Successfull</h2>
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
export default EnterName;