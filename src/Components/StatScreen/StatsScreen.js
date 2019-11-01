import React from 'react';
import StatItem from '../StatItem/StatItem';
import CharacterApiService from '../../services/character-api-service';
import CharacterContext from '../../contexts/CharacterContext';
import './StatScreen.css';
import PropTypes from 'prop-types';

class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.path.split('/')[2],
      screen: this.props.match.path.split('/')[3]
    };
  }

  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string
    })
  };

  static contextType = CharacterContext;

  componentDidMount() {
    this.setState({
      character: this.context.character
    });
  }

  handleAsiChange = (event, index) => {
    CharacterApiService.updateVariableStats(
      this.state.id,
      'asi',
      event.target.value,
      index
    ).then((character) => {
      this.context.setCharacter(character);
      this.setState({ character });
    });
  };

  handleBaseChange = (event) => {
    CharacterApiService.updateBaseStats(
      this.state.id,
      'base',
      event.target.name,
      Number(event.target.value)
    ).then((character) => {
      this.context.setCharacter(character);
      this.setState({ character });
    });
  };

  handleProfChange = (event, index) => {
    CharacterApiService.updateVariableStats(
      this.state.id,
      'prof',
      event.target.value,
      index
    ).then((character) => {
      this.context.setCharacter(character);
      this.setState({ character });
    });
  };

  renderOptions = (prof) => {
    const allOptions = prof.options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      );
    });

    return allOptions;
  };

  renderStandardArray = () => {
    const skills = [
      'Constitution',
      'Strength',
      'Wisdom',
      'Dexterity',
      'Intelligence',
      'Charisma'
    ];

    const skillSelects = skills.map((skill, index) => {
      return (
        <div key={index} className="stat-select-area">
          <label for={skill.toLowerCase()}>{skill}:</label>
          <select
            id={skill.toLowerCase()}
            name={skill.toLowerCase()}
            value={this.state.character.abilities[skill.toLowerCase()].base}
            onChange={(e) => this.handleBaseChange(e)}
            className="base-select"
          >
            <option value={'0'}></option>
            <option value={'15'}>15</option>
            <option value={'14'}>14</option>
            <option value={'13'}>13</option>
            <option value={'12'}>12</option>
            <option value={'10'}>10</option>
            <option value={'8'}>8</option>
          </select>
        </div>
      );
    });

    let repeatErr = false;
    let value;
    for (let i = 0; i < skills.length; i++) {
      let key = skills[i].toLowerCase();
      if (this.state.character.abilities[key].base === value) {
        repeatErr = true;
        break;
      }
      value = this.state.character.abilities[key].base;
    }

    return (
      <div>
        <p>
          You get a standard array of 15, 14, 13, 12, 10, 8. Distribute these
          numbers among the 6 ability types.
        </p>
        <p>
          After you've chosen these base scores, you can choose bonuses based on
          your race, class, and background.
        </p>
        <p>Feel free to play around and see how the numbers below change!</p>
        {skillSelects}
        {repeatErr === true && (
          <p aria-live="assertive" className="error">
            You cannot use the same number twice.
          </p>
        )}
      </div>
    );
  };

  renderProf = () => {
    const allSelections = this.state.character.check_prof.map((prof, index) => {
      if (prof.variable === true) {
        return (
          <div className="choose-prof" key={index}>
            <label>
              Based on your <em className="depends_on">{prof.depends_on}</em>,
              choose one of the following:
            </label>
            <select
              value={this.state.character.check_prof[index].name}
              onChange={(e) => this.handleProfChange(e, index)}
            >
              <option value=''>
                
              </option>
              {this.renderOptions(prof)}
            </select>
          </div>
        );
      }
      else {
        return (
          <div className="choose-prof" key={index}>
            <p>
              Based on your <em className="depends_on">{prof.depends_on}</em>, you are proficient in <em className="depends_on">{prof.name}</em>.
            </p>
          </div>
        )
      }
    });

    let repeatErr = false;
    let value;
    for (let i = 0; i < this.state.character.check_prof.length; i++) {
      if (this.state.character.check_prof[i].name === value) {
        repeatErr = true;
        break;
      }
      value = this.state.character.check_prof[i].name;
    }

    return (
      <div className="choose-prof-area">
        {allSelections}
        {repeatErr === true && (
          <p aria-live="assertive" className="error">
            You cannot select the same skill more than once.
          </p>
        )}
      </div>
    );
  };

  renderAsi = () => {
    const allSelections = this.state.character.asi.map((asi, index) => {
      if (asi.variable === true) {
        return (
          <div key={index}>
            <label>
              Based on your <em className="depends_on">{asi.depends_on}</em>,
              choose one of the following:
            </label>
            <select
              value={this.state.character.asi[index].name}
              onChange={(e) => this.handleAsiChange(e, index)}
            >
              <option value={'strength'}>Strength</option>
              <option value={'charisma'}>Charisma</option>
              <option value={'constitution'}>Constitution</option>
              <option value={'intelligence'}>Intelligence</option>
              <option value={'wisdom'}>Wisdom</option>
              <option value={'dexterity'}>Dexterity</option>
            </select>
          </div>
        );
      }
      else {
        return (
          <div key={index}>
            <p>Based on your <em className="depends_on">{asi.depends_on}</em>, you've received <em className="depends_on">+{asi.magnitude}</em> in <em className="depends_on">{asi.name}</em>.</p>
          </div>
        )
      }
    });
    const nonrepeatables = this.state.character.asi.filter(
      (asi) => asi.norepeat === true
    );
    let repeatErr;
    if (nonrepeatables) {
      repeatErr = false;

      let value;
      for (let i = 0; i < nonrepeatables.length; i++) {
        if (nonrepeatables[i].name === value) {
          repeatErr = true;
        }
        value = nonrepeatables[i].name;
      }
    }

    return (
      <div>
        {allSelections}
        {repeatErr === true && (
          <p>You cannot select the same ability more than once.</p>
        )}
      </div>
    );
  };

  render() {
    if (!this.state.character) {
      return <div>loading...</div>;
    }
    console.log(this.state.character.check_prof);
    console.log(this.state.character.ability_checks);
    console.log(this.state.character.abilities);
    const allAsi = this.renderAsi();
    const standardArray = this.renderStandardArray();
    const profs = this.renderProf();
    const allStats = Object.keys(this.state.character.ability_checks).map(
      (key, i) => {
        return (
          <StatItem
            key={i}
            skill={key}
            mod={this.state.character.ability_checks[key].mod}
            prof={this.state.character.ability_checks[key].prof}
            total={this.state.character.ability_checks[key].total}
          />
        );
      }
    );
    return (
      <div aria-live="polite" className="bodyarea">
        <h3 className="stat-section-header">
          Choose your baseline ability scores:
        </h3>
        {standardArray}
        {allAsi.length && (
          <h3 className="stat-section-header">
            Choose bonuses for your ability scores based on your previous
            selections:
          </h3>
        )}
        {allAsi}
        <h3 className="stat-section-header">
          Choose bonus proficiencies for specific skills:
        </h3>
        {profs}
        <table>
          <tbody>
            <tr className="firstrow">
              <th>Skill</th>
              <th>Base modifier</th>
              <th>Proficiency</th>
              <th>Total modifier</th>
            </tr>
            {allStats}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StatsScreen;
