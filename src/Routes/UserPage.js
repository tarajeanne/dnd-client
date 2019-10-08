import React from 'react';
import UserApiService from '../services/user-api-service';
import CharacterApiService from '../services/character-api-service';
import { Link, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';
import './UserPage.css';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params,
      value: ''
    };
  }
  componentDidMount() {
    UserApiService.getCharactersForUser().then((characters) => {
      const characterInfo = characters.map((character) => ({
        id: character.id,
        name: character.character.name,
        race: character.character.race,
        class: character.character.class
      }));
      this.setState({
        characters: characterInfo
      });
    });
  }

  handleDelete = (id) => {
    CharacterApiService.deleteCharacter(id).then((res) => {
      const characterInfo = this.state.characters.filter(
        (character) => character.id !== id
      );
      this.setState({
        value: '',
        characters: characterInfo
      });
    });
  };

  renderCharacters() {
    return this.state.characters.map((character, index) => {
      return (
        <div key={index} className="characterTile clearfix">
          <Link
            className="character-link"
            to={`/character/${character.id}/charactersheet`}
          >
            <h3 className="character-name">{character.name}</h3>
          </Link>
          <p>
            {character.race} {character.class}
          </p>
          <button
            onClick={() => this.handleDelete(character.id)}
            className="delete-button"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      );
    });
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleNewCharacter = (event) => {
    event.preventDefault();
    return CharacterApiService.postCharacter(this.state.value).then(
      (character) => {
        this.setState({
          redirectTo: character.id
        });
      }
    );
  };
  render() {
    if (!this.state.characters) {
      return <div>loading...</div>;
    }
    const allCharacters = this.renderCharacters();
    if (this.state.redirectTo) {
      return <Redirect to={`/character/${this.state.redirectTo}/race`} />;
    }
    return (
      <div className="userArea">
        <h2 className="greeting">Hello, {TokenService.getUserName()}!</h2>
        <div className="new-character-form">
          <h3 className="greeting">Make a new character:</h3>
          <form onSubmit={this.handleNewCharacter}>
            <label htmlFor="name-input">
              Please enter a name for your character:
            </label>
            <input
              name="name-input"
              value={this.state.value}
              onChange={this.handleChange}
              id="name-input"
              type="text"
              placeholder="Sabrill of Savernke"
            />
            <button className="character-create-button" type="submit">
              Create!
            </button>
          </form>
        </div>
        <h3 className="greeting">Your characters:</h3>
        {allCharacters}
      </div>
    );
  }
}

export default UserPage;
