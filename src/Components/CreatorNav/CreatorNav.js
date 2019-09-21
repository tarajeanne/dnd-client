import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CharacterContext from '../../contexts/CharacterContext';
import CharacterApiService from '../../services/character-api-service';
import './CreatorNav.css';

class CreatorNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.match.path.split('/')[3],
      characterId: this.props.match.path.split('/')[2],
      baseUrl: this.props.match.path
        .split('/')
        .slice(1, 3)
        .join('/'),
      editingName: false
    };
  }

  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string
    })
  };

  handleNameClick = () => {
    this.setState({
      editingName: !this.state.editingName,
      name: this.context.character.name
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  handleNameSubmit = (e) => {
    e.preventDefault();
    const newData = e.target.name.value;
    CharacterApiService.updateCharacter(
      this.state.characterId,
      'name',
      newData
    ).then((character) => {
      this.context.setCharacter(character);
      this.setState({ name: character.name, editingName: false });
    });
  };

  static contextType = CharacterContext;

  renderNextBack = () => {
    let allScreens = [
      'race',
      'class',
      'background',
      'stats',
      'alignment',
      'charactersheet'
    ];
    const screenIndex = allScreens.findIndex(
      (screen) => this.state.screen === screen
    );
    const backScreen = allScreens[screenIndex - 1];
    const nextScreen = allScreens[screenIndex + 1];
    const nextback = (
      <div>
        {screenIndex !== 0 && (
          
            <Link to={`${backScreen}`}><button className="nextback-button">{'Back'}</button></Link>
          
        )}
        {screenIndex !== allScreens.length - 1 && (
          
            <Link tabIndex="1" to={`${nextScreen}`}><button className="nextback-button">Next</button></Link>
          
        )}
      </div>
    );
    return nextback;
  };

  renderNavLinks = () => {
    let charErrors = [];
    let allScreens = [
      'race',
      'class',
      'background',
      'stats',
      'alignment',
      'charactersheet'
    ];
    if (!this.context.character.race) {
      charErrors.push('race');
    }
    if (!this.context.character.class) {
      charErrors.push('class');
    }
    this.context.character.asi.forEach((asi) => {
      if (!asi.name && !charErrors.includes('stats')) {
        charErrors.push('stats');
      }
    });
    if (!charErrors.includes('stats')) {
      this.context.character.check_prof.forEach((prof) => {
        if (!prof.name && !charErrors.includes('stats')) {
          charErrors.push('stats');
        }
      });
    }

    if (!charErrors.includes('stats')) {
      Object.keys(this.context.character.abilities).forEach((ability) => {
        if (
          !this.context.character.abilities[ability].base &&
          !charErrors.includes('stats')
        ) {
          charErrors.push('stats');
        }
      });
    }

    if (!this.context.character.background) {
      charErrors.push('background');
    }

    const allNavLinks = allScreens.map((screen, index) => {
      let charError = charErrors.includes(screen);
      return (
        <NavLink
          to={screen}
          activeClassName="active"
          className={charError ? 'alert' : ''}
          key={index}
        >
          {screen[0].toUpperCase() + screen.slice(1)}
        </NavLink>
      );
    });

    return allNavLinks;
  };

  render() {
    if (this.context.character) {
      return (
        <div>
          <header className="character-creator-header">
            {!this.state.editingName && (
              <h2 onClick={() => this.handleNameClick()}>
                {this.context.character.name}
              </h2>
            )}
            {this.state.editingName && (
              <form onSubmit={(e) => this.handleNameSubmit(e)}>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => this.handleNameChange(e)}
                  value={this.state.name}
                />
              </form>
            )}
            <h3>
              {this.state.screen[0].toUpperCase() + this.state.screen.slice(1)}
            </h3>
          </header>
          <nav className="nav-area">
            <div className="nav-menu">{this.renderNavLinks()}</div>
            <div className="nextback">{this.renderNextBack()}</div>
          </nav>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CreatorNav;
