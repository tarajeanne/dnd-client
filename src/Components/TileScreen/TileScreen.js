import React from 'react';
import Tile from '../Tile/Tile';
import CharacterApiService from '../../services/character-api-service';
import CharacterContext from '../../contexts/CharacterContext';
import './TileScreen.css';

class TileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.match.path.split('/')[3],
      id: this.props.match.path.split('/')[2]
    };
  }

  static contextType = CharacterContext;

  handleClick = (name) => {
    CharacterApiService.updateCharacter(
      this.state.id,
      this.state.screen,
      name
    ).then((res) => {
      this.context.setCharacter(res);
      this.setState({
        selected: this.context.character[this.state.screen]
      });
    });
  };

  componentDidMount() {
    CharacterApiService.getLists(this.state.screen).then((res) => {
      this.setState({
        [this.state.screen]: res,
        selected: this.context.character[this.state.screen]
      });
    });
  }

  render() {
    if (this.state[this.state.screen]) {
      const allElements = this.state[this.state.screen].map((item, index) => {
        return (
          <Tile
            key={index}
            id={index + 1}
            item={item}
            handleClick={this.handleClick}
            selected={this.state.selected}
          />
        );
      });

      return <div className="tile-area">{allElements}</div>;
    } else {
      return <div>loading...</div>;
    }
  }
}

export default TileScreen;
