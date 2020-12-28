import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';
import styles from './Lists.module.css';

class Lists extends Component {
    state = {
    	lists: [
    		{
    			name: 'Bug Trackers',
    			list: [
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
    		{
    			name: 'Features requests',
    			list: [
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
    		{
    			name: 'App Features',
    			list: [
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
    		}
    	]
    }
	render(){
		const { lists } = this.state;
        let getStarted = { to: '/lists/new' };
		let listsToDisplay = null;
		if(lists.length < 1){ listsToDisplay = <p>Add New List to get Started</p>; }
		else{
			listsToDisplay = (
				<Aux>
					<ul className={styles.Lists_ul}>{
						lists.map(list=>{
							return (
								<li key={list.name} className={styles.Lists_ul_li}>
									<div className={styles.Lists_ul_li_title}>
                                        <Link to='/list' className={styles.Lists_ul_li_title_a}>
                                            {list.name}
                                        </Link>
                                    </div>
									<div className={styles.Lists_ul_li_progress_container}>
                                        <div className={styles.Lists_ul_li_progress_child}>
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
export default Lists;