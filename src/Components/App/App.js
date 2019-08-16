import React from 'react';
//import routes
import LandingPage from '../../Routes/LandingPage';
import RegistrationPage from '../../Routes/RegistrationPage';
import UserPage from '../../Routes/UserPage';
import NotFoundPage from '../../Routes/NotFoundPage';
import CharacterCreator from '../../Routes/CharacterCreator';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import PrivateRoute from '../../Utils/PrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  changeScreen = (newScreen) => {
    this.setState({
      screen: newScreen
    });
  };

  render() {
    console.log('THE WHOLE APP RERENDERED!');
    return (
      <div>
        <header className="app-header">
          
        </header>
        <main className="App_main">
          {this.state.error && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <PublicOnlyRoute 
              exact 
              path={'/'} 
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
