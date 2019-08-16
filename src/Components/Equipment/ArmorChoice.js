import React from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import CharacterApiService from '../../services/character-api-service';

class ArmorChoice extends React.Component {
  static contextType = CharacterContext;
  componentDidMount() {
    CharacterApiService.getLists('armor').then((data) => {
      this.setState({
        armor: data
      });
    });
  }

  onArmorChange = (e, index, indexString) => {
    CharacterApiService.changeVariableStats(
      this.props.id,
      'armor',
      e.target.value,
      index
    ).then((character) => {
      this.context.updateCharacter(character);
      this.setState({
        [indexString]: e.target.value
      });
    });
  };

  renderArmorOptions = (item, index) => {
    const allOptions = item.options.map((optionNum) => {
      let option = this.state.armor.filter((armor) => armor.id === optionNum);
      let indexString = 'armor' + index.toString();
      return (
        <tr>
          <td>
            <input
              type="radio"
              name={indexString}
              value={option.name}
              checked={this.state[indexString] === option.name}
              onChange={(e) => this.onArmorChange(e, index, indexString)}
            >
              {option.name}
            </input>
          </td>
          <td>{option.ac_base}</td>
          <td>{option.ac_mod}</td>
          <td>{option.stealth}</td>
        </tr>
      );
    });

    return allOptions;
  };
  renderArmorChoices = () => {
    const armorOptions = this.context.character.armor.map((armor, index) => {
      if (armor.variable === true) {
        return (
          <div>
            <label>
              Based on your <em className="depends_on">{armor.depends_on}</em>,
              choose one of the following:
            </label>
            <table>
              <tr className="firstRow">
                <th>Armor</th>
                <th>Armor Class</th>
                <th>Armor Class Modifier</th>
                <th>Stealth</th>
              </tr>
              {this.renderOptions(armor, index)}
            </table>
          </div>
        );
      }
    });
    return armorOptions;
  };
  render() {
    const options = this.renderArmorChoices();
    return <div className="armor-selector">{options}</div>;
  }
}

export default ArmorChoice;
