import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CharacterContext from '../../contexts/CharacterContext';
import CharacterApiService from '../../services/character-api-service';
import './CreatorNav.css';

class CreatorNav extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.menu = React.createRef();
    this.state = {
      screen: this.props.match.path.split('/')[3],
      characterId: this.props.match.path.split('/')[2],
      baseUrl: this.props.match.path
        .split('/')
        .slice(1, 3)
        .join('/'),
      editingName: false,
      showNav: false
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleMouseDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown, false);
  }

  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string
    })
  };

  handleMouseDown = (e) => {
    e.stopPropagation();
    if (this.node.current) {
      console.log(this.node.current.contains(e.target));
      if ((this.node.current.contains(e.target) ||
      this.menu.current.contains(e.target))) {
        console.log('this part ran');
      }
      else if (this.state.showNav) {
        this.toggleNav();
      }
    } 
  };

  handleNameClick = () => {
    this.setState({
      editingName: !this.state.editingName,
      name: this.context.character.name
    });
  };

  toggleNav = () => {
    this.setState({
      showNav: !this.state.showNav
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

      return (
        <li
          ref={this.node}
          className={this.state.screen === screen && 'active'}
        >
          <Link to={screen} className="creator-nav-link" key={index}>
            {currscreen[0].toUpperCase() + currscreen.slice(1)}
            {charError ? (
              <sup className="alert">
                <i className="fas fa-exclamation"></i>
              </sup>
            ) : (
              <></>
            )}
          </Link>
        </li>
      );
    });

    return allNavLinks;
  };

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

    let nextScreen;
    let backScreen;
    if (screenIndex !== 0) {
      backScreen = allScreens[screenIndex - 1].split(' ').join('');
    }

    if (screenIndex !== allScreens.length - 1) {
      nextScreen = allScreens[screenIndex + 1].split(' ').join('');
    }

    const nextback = (
      <div className="nextback">
        {screenIndex !== 0 && (
          <Link to={`${backScreen}`}>
            <button className="nextback-button">{'Back'}</button>
          </Link>
        )}

        {screenIndex !== allScreens.length - 1 && (
          <Link tabIndex="1" to={`${nextScreen}`}>
            <button className="nextback-button">Next</button>
          </Link>
        )}
        <button ref={this.menu} className="hamburger" onClick={this.toggleNav}>
          <i className="fas fa-bars fa-lg"></i>
        </button>
        {this.state.showNav && (
          <ul className="nav-menu">
            <button
              className="close-nav"
              onClick={this.toggleNav}
              alt="close menu"
            >
              <i className="fas fa-times"></i>
            </button>
            {this.renderNavLinks()}
          </ul>
        )}
      </div>
    );
    return nextback;
  };

  render() {
    if (this.context.character) {
      return (
        <div className="spacer">
          <div className="character-creator-nav">
            <div className="creator-nav-content">
              <header className="character-creator-header">
                {!this.state.editingName && (
                  <h2>
                    {this.context.character.name}
                    <sup onClick={() => this.handleNameClick()}>
                      <i className="far fa-edit"></i>
                    </sup>
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
              </header>
              <nav className="nav-area">{this.renderNextBack()}</nav>
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
