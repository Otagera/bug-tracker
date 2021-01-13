import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';
import styles from './Lists.module.css';
import Loader from '../../UI/Loader/Loader';
import * as actions from '../../../store/actions/index';

class Lists extends Component {
    state = {
    	lists: null/*[
    		{
    			title: 'Bug Trackers'
    		},
    		{
    			title: 'Features requests'
    		},
    		{
    			title: 'App Features'
    		}
    	]*/
    }
    componentDidMount(){
        this.props.onInit();
        this.props.onTasks();
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
	render(){
		const { lists } = this.state;
        let getStarted = { to: '/lists/new' };
		let listsToDisplay = <Loader width='50'/>;
		if(lists && lists.length < 1){ listsToDisplay = <p>Add New List to get Started</p>; }
		else if(lists){
			listsToDisplay = (
				<Aux>
					<ul className={styles.Lists_ul}>{
						lists.map(list=>{
							return (
								<li key={list.title} className={styles.Lists_ul_li}>
									<div className={styles.Lists_ul_li_title}>
                                        <Link to={`/list/${list.id}`} className={styles.Lists_ul_li_title_a}>
                                            {list.title}
                                        </Link>
                                    </div>
									<div className={styles.Lists_ul_li_progress_container}>
                                        <div
                                            className={styles.Lists_ul_li_progress_child}
                                            style={{width: `${list.percentageCompleted}%`}}>
                                        </div>
                                    </div>
								</li>
							)
						})
					}</ul>
				</Aux>
			)
		}
		return (
			<div className={styles.Lists}>
				<h2 className={styles.Header}>Lists</h2>
				{listsToDisplay}
                <div className={styles.Add}>
    				<Button addLink={getStarted} buttonType='addLink'></Button>                    
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
        onTasks: ()=>dispatch(actions.getAllTasksRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lists);