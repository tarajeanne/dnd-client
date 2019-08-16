import React from 'react';
import CharacterContext from '../contexts/CharacterContext';
import CharacterApiService from '../services/character-api-service';
import NavBar from '../Components/Nav/Nav';
import { Route } from 'react-router-dom';
import TileScreen from '../Components/TileScreen/TileScreen';
import StatsScreen from '../Components/StatScreen/StatsScreen';
import CharacterSheet from '../Components/CharacterSheet/CharacterSheet';

class CharacterCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characterId: this.props.match.params.characterId,
      editingName: false
    };
  }

  static contextType = CharacterContext;
  componentDidMount() {
    CharacterApiService.getCharacter(this.state.characterId).then(
      (character) => {
        this.context.setCharacter(character);
        this.setState({ name: character.name });
      }
    );
  }
  render() {
    if (!this.context.character) {
      return <div>loading...</div>;
    }
    return (
      <>
        
        <Route
          exact
          path={`${this.props.match.url}/race`}
          render={(routeProps) => (
            <>
              <NavBar {...routeProps} />
              <TileScreen {...routeProps} />
            </>
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/class`}
          render={(routeProps) => (
            <>
              <NavBar {...routeProps} />
              <TileScreen {...routeProps} />
            </>
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/background`}
          render={(routeProps) => (
            <>
              <NavBar {...routeProps} />
              <TileScreen {...routeProps} />
            </>
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/stats`}
          render={(routeProps) => (
            <>
              <NavBar {...routeProps} />
              <StatsScreen {...routeProps} />
            </>
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/alignment`}
          render={(routeProps) => (
            <>
              <NavBar {...routeProps} />
              <TileScreen {...routeProps} />
            </>
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/charactersheet`}
          render={(routeProps) => (
            <>
              <NavBar {...routeProps} />
              <CharacterSheet {...routeProps} />
            </>
          )}
        />
        
      </>
    );
  }
}

export default CharacterCreator;
