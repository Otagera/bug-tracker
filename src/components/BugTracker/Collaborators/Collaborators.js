import React, { Component } from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import styles from './Collaborators.module.css';
import FormValidation from '../../../services/FormValidation';
import InputGroup from '../../UI/InputGroup/InputGroup';
import Button from '../../UI/Button/Button';

class Collaborators extends Component {
    state = {
    	collaborators: [
    		'ikwuje@gmail.com',
    		'jeremiah@gmail.com'
    	],
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
		}
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
	removeCollab = (index) =>{
		const tempCollabs = [ ...this.state.collaborators ];
		tempCollabs.splice(index, 1);
		console.log(tempCollabs);
		this.setState({ collaborators: tempCollabs });
	}
	render(){
		const { collaborators, formData } = this.state;
		let formElementArray = [];
		for(let key in formData){
			formElementArray.push({
				id: key,
				config: formData[key]
			});
		}
		let collabToDisplay = null;
		if(collaborators.length >= 1){
			collabToDisplay = (
				<Aux>
					<ul className={styles.List_ul}>{
						collaborators.map((collab, i)=>{
							return (
								<li key={i} className={styles.Collab_ul_li}>
									<p className={styles.Collab_ul_li_title}>
                                        {collab}
                                    </p>
									<div className={styles.Cancel} onClick={()=>{this.removeCollab(i)}}>
									</div>
								</li>
							)
						})
					}</ul>
				</Aux>
			);
		}
		return (
			<div className={styles.Collab}>
				<div className={styles.Header}>
					<h2>Add collaborators</h2>
					<div className={styles.Cancel} onClick={this.props.clickedClose}></div>
					<div className={styles.Input}>{
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
					}</div>
					<Button>Add</Button>
				</div>
				{collabToDisplay}
			</div>
		);
	}
}
export default Collaborators;