import React from 'react';
//import routes
import LandingPage from '../../Routes/LandingPage';
import RegistrationPage from '../../Routes/RegistrationPage';
import UserPage from '../../Routes/UserPage';
import NotFoundPage from '../../Routes/NotFoundPage';
import CharacterCreator from '../../Routes/CharacterCreator';
import characterHelper from '../../services/character-service';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute';
import Header from '../Header/Header';
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

  updateCharacterName = (newName) => {
    const newChar = characterHelper.updateName(this.state.character, newName);
    this.setState({ character: newChar });
  };

  updateCharacterRace = (newRace) => {
    const newChar = characterHelper.updateRace(this.state.character, newRace);
    this.setState({ character: newChar });
  };

  updateCharacterClass = (newClass) => {
    const newChar = characterHelper.updateClass(this.state.character, newClass);
    this.setState({ character: newChar });
  };

  updateCharacterBackground = (newBackground) => {
    const newChar = characterHelper.updateBackground(
      this.state.character,
      newBackground
    );
    this.setState({ character: newChar });
  };

  updateCharacterAsi = (index, name) => {
    const newChar = characterHelper.updateAsi(
      this.state.character,
      index,
      name
    );
    this.setState({ character: newChar });
  };

  updateCharacterCheckProf = (index, name) => {
    const newChar = characterHelper.updateCheckProf(
      this.state.character,
      index,
      name
    );
    this.setState({ character: newChar });
  };

  updateCharacterStatBase = (stat, num) => {
    const newChar = characterHelper.updateStatBase(
      this.state.character,
      stat,
      num
    );
    this.setState({ character: newChar });
  };

  render() {
    return (
      <div>
        <header className="app-header">
          <Header />
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
