import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import Aux from '../../../../hoc/Auxillary/Auxillary';
import Collaborators from '../../Collaborators/Collaborators';
import Button from '../../../UI/Button/Button';
import Modal from '../../../UI/Modal/Modal';
import EditableContainer from '../../../UI/DoubleTapEdit/EditableContainer';
import styles from './List.module.css';

class List extends Component {
    state = {
    	list: {
	    	name: 'Bug Trackers',
			actions: [
				{
					title: 'Change the home buttons to blue',
					done: true
				},
				{
					title: 'Login Modal id not coming up',
					done: true
				},
				{
					title: 'Remove the footer wordpress credit link',
					done: false
				}
			]    		
    	},
    	showModal: false
    }
	showModal = () =>{
		this.setState({ showModal: true });
	}
	removeModal = () =>{
		this.setState({ showModal: false });
	}
	checkListItem = (index) =>{
		const tempList = { ...this.state.list };
		const tempDone = tempList.actions[index].done;
		tempList.actions[index].done = !tempDone;
		this.setState({ list: tempList });
	}
	editItem = (index, value) =>{
		const tempList = { ...this.state.list };
		tempList.actions[index].title = value;
		this.setState({ list: tempList });
	}
	addItem = (value) =>{
		const tempList = { ...this.state.list };
		tempList.actions.push({ title: value, done: false });
		this.setState({ list: tempList });
	}
	render(){
		const { list, showModal } = this.state;
        let getStarted = { to: '/list/new' };
		let listToDisplay = null;
		if(list.actions && list.actions.length < 1){
			listToDisplay = (
				<ul className={styles.List_ul}>
					<li className={styles.List_ul_li}>
						<div className={styles.List_ul_li_check}></div>
						<EditableContainer
							doubleClick={false}
							handleEnter={this.addItem}
							className={[styles.List_ul_li_title, styles.List_ul_li_new].join(' ')}>
							Write new Task
						</EditableContainer>
					</li>
				</ul>
			);
		}
		else{
			listToDisplay = (
				<Aux>
					<ul className={styles.List_ul}>{
						list.actions.map((action, i)=>{
							return (
								<li key={i} className={styles.List_ul_li}>
									<div className={styles.List_ul_li_check} onClick={()=>this.checkListItem(i)}>
										{(action.done)? 
											<FontAwesomeIcon
											  icon={faCheck}
											  className={styles.List_ul_li_check_icon} />:
											  null
										}
									</div>
									<EditableContainer
										doubleClick={true}
										handleEnter={this.editItem.bind(null, i)} 
										className={styles.List_ul_li_title} >
		                                    {action.title}
									</EditableContainer>
								</li>
							)
						})
					}
						<li className={styles.List_ul_li}>
							<div className={styles.List_ul_li_check}></div>
							<EditableContainer
								doubleClick={false}
								handleEnter={this.addItem}
								className={[styles.List_ul_li_title, styles.List_ul_li_new].join(' ')}>
								Write new Task
							</EditableContainer>
						</li>
					</ul>
				</Aux>
			)
		}
		return (
			<div className={styles.List}>
				<div className={styles.Header}>
					<h2>{list.name}</h2>
					<FontAwesomeIcon
						  icon={faUserPlus}
						  className={styles.Header_icon} 
						  onClick={this.showModal}/>
				</div>
				{listToDisplay}
                <div className={styles.Add}>
    				<Button addLink={getStarted} buttonType='addLink'></Button>                    
                </div>
				<Modal
					show={showModal}
					modalClosed={this.removeModal}>
					<Collaborators clickedClose={this.removeModal}/>
				</Modal>
			</div>
		);
	}
}
export default List;