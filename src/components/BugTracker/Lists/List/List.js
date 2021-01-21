import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import Aux from '../../../../hoc/Auxillary/Auxillary';
import Collaborators from '../../Collaborators/Collaborators';
import Modal from '../../../UI/Modal/Modal';
import EditableContainer from '../../../UI/DoubleTapEdit/EditableContainer';
import * as actions from '../../../../store/actions/index';
import styles from './List.module.css';

class List extends Component {
    state = {
    	list: {
    		title: 'Title'
    	},
    	tasks: [/*
			{
				title: 'Change the home buttons to blue',
				status: true,
				id: 1
			},
			{
				title: 'Login Modal id not coming up',
				status: true,
				id: 2
			},
			{
				title: 'Remove the footer wordpress credit link',
				status: false,
				id: 3
			}
		*/],
    	showModal: false
    }
    componentDidMount(){
        this.props.onInit();
        this.props.onList(this.props.match.params.listId);
    }
    static getDerivedStateFromProps(props, state){
        //console.log(props.list);
        if(props.tasks && props.tasks.length > 0){
	        if(props.list){
	        	return { list: props.list, tasks: props.tasks.filter(task=>task.parent === props.match.params.listId) };
	        }else{
	            return { tasks: props.tasks.filter(task=>task.parent === props.match.params.listId) };
	        }
        }
        return null;
    }
	showModal = () =>{
		this.setState({ showModal: true });
	}
	removeModal = () =>{
		this.setState({ showModal: false });
	}
	updateTask = (id, whatToUpdate, updatedValue)=>{
		const updatedTask = JSON.stringify({
			id: id,
			[whatToUpdate]: updatedValue
		});
		this.props.onUpdateTask(updatedTask);
	}
	checkListItem = (index) =>{
		const tempTasks = [...this.state.tasks ];
		const tempStatus = tempTasks[index].status;
		tempTasks[index].status = !tempStatus;
		this.updateTask(tempTasks[index].id, 'status', (tempTasks[index].status)? '1': '0');
		this.setState({ tasks: tempTasks });
	}
	editItem = (index, value) =>{
		const tempTasks = [...this.state.tasks ];
		tempTasks[index].title = value;
		this.updateTask(tempTasks[index].id, 'title', tempTasks[index].title);
		this.setState({ tasks: tempTasks });
	}
	addItem = (value) =>{
		const tempTasks = [...this.state.tasks ];
		tempTasks.push({ title: value, status: false });
		this.setState({ tasks: tempTasks });
		this.props.onAddTask(JSON.stringify({
			title: value,
			parent: this.props.match.params.listId
		}));
        this.props.onInit();
        this.props.onList(this.props.match.params.listId);
	}
	render(){
		const { list, tasks, showModal } = this.state;
		let tasksToDisplay = null;
		if(tasks && tasks.length < 1){
			tasksToDisplay = (
				<ul className={styles.Tasks_ul}>
					<li className={styles.Tasks_ul_li}>
						<div className={styles.Tasks_ul_li_check}></div>
						<EditableContainer
							doubleClick={false}
							handleEnter={this.addItem}
							className={[styles.Tasks_ul_li_title, styles.Tasks_ul_li_new].join(' ')}>
							Write new Task
						</EditableContainer>
					</li>
				</ul>
			);
		}
		else{
			tasksToDisplay = (
				<Aux>
					<ul className={styles.Tasks_ul}>{
						tasks.map((task, i)=>{
							return (
								<li key={i} className={styles.Tasks_ul_li}>
									<div className={styles.Tasks_ul_li_check} onClick={()=>this.checkListItem(i)}>
										{(task.status === '1')? 
											<FontAwesomeIcon
											  icon={faCheck}
											  className={styles.Tasks_ul_li_check_icon} />:
											  null
										}
									</div>
									<EditableContainer
										doubleClick={true}
										handleEnter={this.editItem.bind(null, i)} 
										className={styles.Tasks_ul_li_title} >
		                                    {task.title}
									</EditableContainer>
								</li>
							)
						})
					}
						<li className={styles.Tasks_ul_li}>
							<div className={styles.Tasks_ul_li_check}></div>
							<EditableContainer
								doubleClick={false}
								handleEnter={this.addItem}
								className={[styles.Tasks_ul_li_title, styles.Tasks_ul_li_new].join(' ')}>
								Write new Task
							</EditableContainer>
						</li>
					</ul>
				</Aux>
			)
		}
		return (
			<div className={styles.Tasks}>
				<div className={styles.Header}>
					<h2>{list.title}</h2>
					<FontAwesomeIcon
						  icon={faUserPlus}
						  className={styles.Header_icon} 
						  onClick={this.showModal}/>
				</div>
				{tasksToDisplay}
				<Modal
					show={showModal}
					modalClosed={this.removeModal}>
					<Collaborators clickedClose={this.removeModal}/>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state =>{
    return {
    	tasks: state.bugtracker.tasks,
    	list: state.bugtracker.list
    };
}
const mapDispatchToProps = dispatch =>{
    return {
    	onInit: ()=>dispatch(actions.getAllTasksRequest()),
        onList: (listId)=>dispatch(actions.getListRequest(listId)),
        onAddTask: (taskData)=>dispatch(actions.createTaskRequest(taskData)),
        onUpdateTask: (taskData)=>dispatch(actions.updateTaskRequest(taskData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));