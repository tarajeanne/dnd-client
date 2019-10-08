import React from 'react';
import { Link } from 'react-router-dom';
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
      'character sheet'
    ];
    const screenIndex = allScreens.findIndex(
      (screen) => this.state.screen === screen.split(' ').join('')
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
      'character sheet'
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

    const allNavLinks = allScreens.map((currscreen, index) => {
      let screen = currscreen.split(' ').join('');
      let charError = charErrors.includes(screen);
      let classNames = ['creator-nav-link'];

      if (this.state.screen === screen) {
        classNames.push('active');
      }

      let className = classNames.join(' ');
      console.log(className);
      return (
        <Link
          to={screen}
          className={className}
          key={index}
        >
          {currscreen[0].toUpperCase() + currscreen.slice(1)}{(charError ? (<sup className='alert'><i class="fas fa-exclamation"></i></sup>) : <></>)}
        </Link>
      );
    });

    return allNavLinks;
  };

  render() {
    console.log(this.state);
    if (this.context.character) {
      return (
        <div className="spacer">
        <div className="character-creator-nav">
          <div className="creator-nav-content">

          
          <header className="character-creator-header">
            {!this.state.editingName && (
              <h2>
                {this.context.character.name}<sup onClick={() => this.handleNameClick()}><i class="far fa-edit"></i></sup>
              </h2>
            )}
            {this.state.editingName && (
              <form onSubmit={(e) => this.handleNameSubmit(e)}>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => this.handleNameChange(e)}
                  value={this.state.name}
                  className="name-edit"
                />
              </form>
            )}
            {/* <h3>
              {this.state.screen[0].toUpperCase() + this.state.screen.slice(1)}
            </h3> */}
          </header>
          <nav className="nav-area">
          <div className="nextback">{this.renderNextBack()}</div>
            <div className="nav-menu">{this.renderNavLinks()}</div>
          </nav>
          </div>
        </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CreatorNav;
