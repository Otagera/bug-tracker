import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Aux from '../../hoc/Auxillary/Auxillary';
import GetStarted from './GetStarted/GetStarted';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Lists from './Lists/Lists';
import List from './Lists/List/List';
import NotFound from './NotFound';

class BugTracker extends Component {
    state = {}
	render(){
		return (
			<Aux>
				<Switch>
					<Redirect from='/' exact to='/get-started' />
					<Route
						path='/get-started'
						exact
						component={()=><GetStarted />}
					/>
					<Route 
						path='/signup'
						exact
						component={()=><Signup />}
					/>
					<Route 
						path='/login'
						exact
						component={()=><Login />}
					/>
					<Route 
						path='/lists'
						exact
						component={()=><Lists />}
					/>
					<Route 
						path='/list'
						exact
						component={()=><List />}
					/>
					<Route component={()=><NotFound />} />
				</Switch>				
			</Aux>
		);
	}
}
export default BugTracker;