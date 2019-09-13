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
  };

  static contextType = CharacterContext;
  handleClick = () => {
    console.log('change!!');
    this.props.handleClick(this.props.item.name);
  };

  render() {
    return (
      <label htmlFor={`${this.props.item.name}-tile-select`}>
        <div
          className={
            this.props.selected == this.props.item.name
              ? 'option-tile selected'
              : 'option-tile'
          }
        >
          <header><h2>{this.props.item.name}</h2></header>
          <input
            className="tile-radio"
            onChange={() => {
              this.handleClick();
            }}
            type="radio"
            checked={this.props.selected == this.props.item.name}
            value={this.props.item.name}
            id={`${this.props.item.name}-tile-select`}
          ></input>
          <p className="option-description">{this.props.item.desc}</p>
        </div>
      </label>
    );
  }
}

export default Tile;
