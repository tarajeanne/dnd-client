/* eslint-disable eqeqeq */
import React from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import './Tile.css';
import PropTypes from 'prop-types';

class Tile extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string
    }),
    selected: PropTypes.string
  }

  static contextType = CharacterContext;
  handleClick = () => {
    this.props.handleClick(this.props.item.name)
  }
  
  render() {
    return (
      <div className={(this.props.selected == this.props.item.name) ? "option-tile selected" : "option-tile"} onClick={()=>{this.handleClick()}}>
        <header>
          <h2>{this.props.item.name}</h2>
        </header>
        <p className="option-description">{this.props.item.desc}</p>
      </div>
    );
  }
}

export default Tile;