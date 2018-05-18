import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload';
import Display from './components/Display';
import Screen from './components/Screen';
import Scheduler from './components/Scheduler/Scheduler';
import Form from './components/Scheduler/Form';
import Callback from './components/Callback';
import Login from './components/Logging/Login';
import Logout from './components/Logging/Logout';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

const Root = () => {

  return (

    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Display}/>
        <Route path="/upload" component={Upload} onEnter={requireAuth} />
        <Route path="/screen" component={Screen} onEnter={requireAuth} />
        <Route path="/form" component={Form} onEnter={requireAuth} />
        <Route path="/scheduler" component={Scheduler} onEnter={requireAuth} />
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
