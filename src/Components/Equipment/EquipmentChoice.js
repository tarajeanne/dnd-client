import React from 'react';
import CharacterApiService from '../../services/character-api-service';
import CharacterContext from '../../contexts/CharacterContext';

class EquipmentChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static contextType = CharacterContext;

  componentDidMount() {
    this.setState({
      character: this.context.character
    });
  }

  handleEquipmentChange = (event, index) => {
    CharacterApiService.updateVariableStats(
      this.props.id,
      'equipment',
      event.target.value,
      index
    ).then((character) => {
      this.context.setCharacter(character);
      this.setState({ character });
    });
  };

  renderOptions = (equipment) => {
    const allOptions = equipment.options.map((option) => {
      return <option value={option}>{option}</option>;
    });

    return allOptions;
  };

  renderEquipment = () => {
    const allSelections = this.state.character.equipment.map(
      (equipment, index) => {
        if (equipment.variable === true) {
          return (
            <div>
              <label>
                Based on your{' '}
                <em className="depends_on">{equipment.depends_on}</em>, choose
                one of the following:
              </label>
              <select
                value={this.state.character.equipment[index].name}
                onChange={(e) => this.handleEquipmentChange(e, index)}
              >
                {this.renderOptions(equipment)}
              </select>
            </div>
          );
        } else {
          return <></>;
        }
      }
    );

    return allSelections;
  };
  render() {
    if (!!this.state.character) {
      const equipmentChoices = this.renderEquipment();
      return <div>{equipmentChoices}</div>;
    }
    else {
      return <></>
    }
  }
}

export default EquipmentChoice;
