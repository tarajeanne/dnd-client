import React from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import ArmorChoice from './ArmorChoice';
import WeaponsChoice from './WeaponsChoice';
import EquipmentChoice from './EquipmentChoice';

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.path.split('/')[2]
    };
  }

  static contextType = CharacterContext;

  componentDidMount() {
    this.setState({
      character: this.context.character
    });
  }

  renderAllWeapons = () => {
    const allWeapons = this.context.character.weapons.map((weapon) => {
      if (weapon.name) {
        return (
          <tr>
            <td>{weapon.name}</td>
            <td>{weapon.dice_count}</td>
            <td>{weapon.damage_type}</td>
            <td>{weapon.properties}</td>
          </tr>
        );
      } else {
        return <></>;
      }
    });

    return allWeapons;
  };

  renderAllArmor = () => {
    const allArmor = this.context.character.armor.map((armor) => {
      if (armor.name) {
        return (
          <tr>
            <td>{armor.name}</td>
            <td>{armor.ac_base}</td>
            <td>{this.context.character.ac}</td>
          </tr>
        );
      } else {
        return <></>;
      }
    });

    return allArmor;
  };

  renderAllEquipment = () => {
    const allEquipment = this.context.character.equipment.map((equipment) => {
      if (equipment.name) {
        return (
          <tr>
            <td>{equipment.name}</td>
            <td>{equipment.quantity || 1}</td>
          </tr>
        );
      } else {
        return <></>;
      }
    });

    return allEquipment;
  };

  render() {
    );
    const allWeapons = this.renderAllWeapons();
    const allArmor = this.renderAllArmor();
    const allEquipment = this.renderAllEquipment();
    return (
      <div>
        <WeaponsChoice id={this.state.id} />
        <ArmorChoice id={this.state.id} />
        <EquipmentChoice id={this.state.id} />
        <h3>Your equipment:</h3>
        <h4>Your weapons:</h4>
        <table>
          <tr>
            <th>Weapon</th>
            <th>Damage</th>
            <th>Damage type</th>
            <th>Properties</th>
          </tr>
          {allWeapons}
        </table>
        <h4>Your armor:</h4>
        <table>
          <tr>
            <th>Armor</th>
            <th>Armor class</th>
            <th>Total armor class for player</th>
          </tr>
          {allArmor}
        </table>

        <h4>Other items:</h4>
        <table>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
          {allEquipment}
        </table>
      </div>
    );
  }
}

export default Equipment;
