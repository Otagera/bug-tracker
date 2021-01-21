import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from '@sweetalert/with-react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';
import styles from './Lists.module.css';
import Loader from '../../UI/Loader/Loader';
import EditableContainer from '../../UI/DoubleTapEdit/EditableContainer';
import * as actions from '../../../store/actions/index';

class Lists extends Component {
    state = {
    	lists: null,
        addShow: false
    }
    inputRefs = {};
    setCompetitionRef = (ref, index) =>{
        this.inputRefs = {
            ...this.inputRefs,
            [index]:{
                ref: ref
            }
        }
        //console.log(this.inputRefs);
    }
    componentDidMount(){
        this.props.onInit();
        this.props.onTasks();
    }
    componentWillUnmount () {
        if (this.timeout) clearTimeout(this.timeout);
    }
    static getDerivedStateFromProps(props, state){
        //console.log(props.lists);
        if(props.lists && props.lists.length > 0){
            let tempLists = [ ...props.lists ];
            if(props.tasks && props.tasks.length > 0){
                for(let i = 0; i < tempLists.length; i++){
                    let tempTasks = props.tasks.filter(task=>task.parent === tempLists[i].id);
                    let tempCompleted = 0;
                    tempTasks.forEach((task)=>{
                        task.status = '1';
                        if(task.status === '1'){ tempCompleted += 1; }
                    });
                    tempLists[i].percentageCompleted = (tempCompleted)? (tempCompleted / tempTasks.length) * 100: 0
                }
                return { lists: tempLists };
            }else{
                return { lists: tempLists };
            }
        }
        return null;
    }
    updateTask = (id, whatToUpdate, updatedValue)=>{
        const updatedTask = JSON.stringify({
            id: id,
            [whatToUpdate]: updatedValue
        });
        this.props.onUpdateList(updatedTask);
    }
    addList = (listTitle)=>{
        this.props.onAddList(JSON.stringify({
            title: listTitle,
            parent: 0
        }));
        this.setState({ addShow: false });
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
            this.props.onInit();            
        }, 100);
    }
    editList = (index, value)=>{
        const tempLists = [...this.state.lists ];
        tempLists[index].title = value;
        tempLists[index].edit = null;
        this.updateTask(tempLists[index].id, 'title', tempLists[index].title);
        this.setState({ lists: tempLists });
    }
    handleEditListBtn = (index)=>{
        const tempLists = [...this.state.lists ];
        tempLists[index].edit = true;
        this.inputRefs[index].ref.firstElementChild.click();
        this.inputRefs[index].ref.firstElementChild.click();
        this.setState({ lists: tempLists });
    }
    handleDeleteListBtm = (list)=>{
        swal({
            title: 'Delete Confirmation',
            text: `Are you sure you want to delete ${list.title}?`,
            icon: 'warning',
            dangerMode: true,
            buttons: true
        }).then(willDelete=>{
            if(willDelete){
                this.props.onDeleteList(JSON.stringify({ id: list.id }));
                swal('Deleted!', `${list.title} has been deleted`, 'success');
            }else{
                swal('Operation Cancelled');
            }
        });
    }
    showAddListInput = ()=>{
        this.setState((prevState)=>{ return { addShow: !prevState.addShow } });
    }
	render(){
		const { lists, addShow } = this.state;
		let listsToDisplay = <Loader width='50'/>;
        let addInput = null;
		if(lists && lists.length < 1){ listsToDisplay = <p>Add New List to get Started</p>; }
		else if(lists){
			listsToDisplay = (
				<Aux>
					<ul className={styles.Lists_ul}>{
						lists.map((list, i)=>{
							return (
								<li key={list.title} className={styles.Lists_ul_li}>
									<div className={styles.Lists_ul_li_title}>
                                        <div ref={(el)=>{this.setCompetitionRef(el, i)}}>
                                        <EditableContainer
                                            doubleClick={true}
                                            handleEnter={this.editList.bind(null, i)} >
                                            {(list.edit)?
                                                list.title:
                                                <Link to={`/list/${list.id}`} className={styles.Lists_ul_li_title_a}>
                                                    {list.title}
                                                </Link>
                                            }
                                        </EditableContainer>
                                        </div>
                                    </div>
									<div className={styles.Lists_ul_li_progress_container}>
                                        <div
                                            className={styles.Lists_ul_li_progress_child}
                                            style={{width: `${list.percentageCompleted}%`}}>
                                        </div>
                                    </div>
                                    <div className={styles.Lists_ul_li_btns}>
                                        <FontAwesomeIcon icon={faPen} onClick={()=>this.handleEditListBtn(i)}/>
                                        <FontAwesomeIcon icon={faTrash} onClick={()=>this.handleDeleteListBtm(list)}/>
                                    </div>
								</li>
							)
						})
					}</ul>
				</Aux>
			)
		}
        if(addShow){
            addInput = (
                <EditableContainer
                    doubleClick={false}
                    edit={true}
                    handleEnter={this.addList} >
                </EditableContainer>
            );
        }
		return (
			<div className={styles.Lists}>
				<h2 className={styles.Header}>Lists</h2>
				{listsToDisplay}
                {addInput}
                <div className={styles.Lists_Add_Btn}>
    				<Button buttonType='add' clicked={this.showAddListInput}></Button>                    
                </div>
			</div>
		);
	}
}
const mapStateToProps = state =>{
    return {
        lists: state.bugtracker.lists,
        tasks: state.bugtracker.tasks
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        onInit: ()=>dispatch(actions.getAllListsRequest()),
        onTasks: ()=>dispatch(actions.getAllTasksRequest()),
        onAddList: (listData)=>dispatch(actions.createListRequest(listData)),
        onUpdateList: (listUpdateData)=>dispatch(actions.updateListRequest(listUpdateData)),
        onDeleteList: (listDeleteData)=>dispatch(actions.deleteOneListRequest(listDeleteData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lists);