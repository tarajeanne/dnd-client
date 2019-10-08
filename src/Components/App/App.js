import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';

import LandingPage from '../../Routes/LandingPage';
import RegistrationPage from '../../Routes/RegistrationPage';
import UserPage from '../../Routes/UserPage';
import NotFoundPage from '../../Routes/NotFoundPage';
import CharacterCreator from '../../Routes/CharacterCreator';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets()
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <main className="App_main">
          {this.state.error && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <PublicOnlyRoute 
              exact 
              path={['/', '/login']} 
              component={LandingPage} />

            <PublicOnlyRoute 
              path={'/register'} 
              component={RegistrationPage} />
            <PrivateRoute 
              path={'/user'} 
              component={UserPage} />
            <PrivateRoute
              path={'/character/:characterId'}
              component={CharacterCreator}
            />
            <Route 
              component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
