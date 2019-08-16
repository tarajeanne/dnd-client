import React from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import CharacterApiService from '../../services/character-api-service';

class WeaponsChoice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error:null
    }
  }
  static contextType = CharacterContext;
  componentDidMount() {
    this.context.character.weapons.forEach((weapon, index) => {
      this.setState({
        ['weapon' + index.toString]: weapon.name
      })
    })
    CharacterApiService.getLists('weapon').then((data) => {
      this.setState({
        weapons: data
      });
    });
  }

  onWeaponChange = (e, index, indexString, weaponName) => {
    console.log(e);
    CharacterApiService.updateVariableStats(
      this.props.id,
      'weapon',
      weaponName,
      index
    ).then((character) => {
      this.context.setCharacter(character);
      this.setState({
        [indexString]: weaponName
      });
    });
  };

  renderWeaponsOptions = (item, index, indexString) => {
    const allOptions = item.options.map((optionNum) => {
      let option = this.state.weapons.filter(
        (weapon) => weapon.id === optionNum
      );

      return (
        <tr>
          <td>
            <input
              type="radio"
              name={indexString}
              value={option[0].name}
              isChecked={this.state[indexString] === option[0].name}
              onChange={(e) => this.onWeaponChange(e, index, indexString, option[0])}
            >
              {option.name}
            </input>
          </td>
          <td>{option[0].dice_count}</td>
          <td>{option[0].damage_type}</td>
          <td>{option[0].properties}</td>
        </tr>
      );
    });

    return allOptions;
  };
  renderWeaponsChoices = () => {
    const weaponsOptions = this.context.character.weapons.map(
      (weapon, index) => {
        let indexString = 'weapon' + index.toString();
        if (weapon.variable === true) {
          return (
            <div>
              <label>
                Based on your{' '}
                <em className="depends_on">{weapon.depends_on}</em>, choose one
                of the following:
              </label>
              <table>
                <tr className="firstRow">
                  <th>Weapon</th>
                  <th>Damage</th>
                  <th>Damage type</th>
                  <th>Properties</th>
                </tr>
                {this.renderWeaponsOptions(weapon, index, indexString)}
              </table>
            </div>
          );
        }
        else {
          return <></>
        }
      }
    );
    return weaponsOptions;
  };
  render() {
    if(!this.state.weapons) {
      return <></>
    }
    const options = this.renderWeaponsChoices();
    return <div className="weapons-selector">{options}</div>;
  }
}

export default WeaponsChoice;
