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
      screen: this.props.match.path.split('/')[3],
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
    
    CharacterApiService.updateVariableStats(this.state.id, 'asi', event.target.value, index)
      .then(character => {
        this.context.setCharacter(character);
        this.setState({character});
      })
  };

  handleBaseChange = (event) => {
    CharacterApiService.updateBaseStats(this.state.id, 'base', event.target.name, Number(event.target.value))
    .then(character => {
      this.context.setCharacter(character);
      this.setState({character});
    })
  };

  handleProfChange = (event, index) => {
    CharacterApiService.updateVariableStats(this.state.id, 'prof', event.target.value, index)
    .then(character => {
      this.context.setCharacter(character);
      this.setState({character});
    })
  };

  renderOptions = (prof) => {
    const allOptions = prof.options.map((option) => {
      return <option value={option}>{option}</option>;
    });

    return allOptions;
  };

  renderStandardArray = () => {
    
    return (
      <div>
        <p>
          It's time to pick ability scores! These numbers determine what kinds
          of things your character will be good at during your campaign.
        </p>
        <p>
          You get a standard array of 15, 14, 13, 12, 10, 8. Distribute these
          numbers among the 6 ability types.
        </p>
        <p>
          After you've chosen these base scores, you can choose bonuses based on
          your race, class, and background.
        </p>
        <p>Feel free to play around and see how the numbers below change!</p>
        <label>Constitution</label>
        <select
          name={'constitution'}
          value={this.state.character.abilities.constitution.base}
          onChange={(e) => this.handleBaseChange(e)}
        >
          <option value={'0'}></option>
          <option value={'15'}>15</option>
          <option value={'14'}>14</option>
          <option value={'13'}>13</option>
          <option value={'12'}>12</option>
          <option value={'10'}>10</option>
          <option value={'8'}>8</option>
        </select>
        <label>Strength</label>
        <select
          name={'strength'}
          value={this.state.character.abilities.strength.base}
          onChange={(e) => this.handleBaseChange(e)}
        >
          <option value={'0'}></option>
          <option value={'15'}>15</option>
          <option value={'14'}>14</option>
          <option value={'13'}>13</option>
          <option value={'12'}>12</option>
          <option value={'10'}>10</option>
          <option value={'8'}>8</option>
        </select>
        <label>Wisdom</label>
        <select
          name={'wisdom'}
          value={this.state.character.abilities.wisdom.base}
          onChange={(e) => this.handleBaseChange(e)}
        >
          <option value={'0'}></option>
          <option value={'15'}>15</option>
          <option value={'14'}>14</option>
          <option value={'13'}>13</option>
          <option value={'12'}>12</option>
          <option value={'10'}>10</option>
          <option value={'8'}>8</option>
        </select>
        <label>Dexterity</label>
        <select
          name={'dexterity'}
          value={this.state.character.abilities.dexterity.base}
          onChange={(e) => this.handleBaseChange(e)}
        >
          <option value={'0'}></option>
          <option value={'15'}>15</option>
          <option value={'14'}>14</option>
          <option value={'13'}>13</option>
          <option value={'12'}>12</option>
          <option value={'10'}>10</option>
          <option value={'8'}>8</option>
        </select>
        <label>Intelligence</label>
        <select
          name={'intelligence'}
          value={this.state.character.abilities.intelligence.base}
          onChange={(e) => this.handleBaseChange(e)}
        >
          <option value={'0'}></option>
          <option value={'15'}>15</option>
          <option value={'14'}>14</option>
          <option value={'13'}>13</option>
          <option value={'12'}>12</option>
          <option value={'10'}>10</option>
          <option value={'8'}>8</option>
        </select>
        <label>Charisma</label>
        <select
          name={'charisma'}
          value={this.state.character.abilities.charisma.base}
          onChange={(e) => this.handleBaseChange(e)}
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
  };

  renderProf = () => {
    const allSelections = this.state.character.check_prof.map((prof, index) => {
      if (prof.variable === true) {
        return (
          <div>
            <label>
              Based on your <em className="depends_on">{prof.depends_on}</em>, choose one of the following:
            </label>
            <select
              value={this.state.character.check_prof[index].name}
              onChange={(e) => this.handleProfChange(e, index)}
            >
              {this.renderOptions(prof)}
            </select>
          </div>
        );
      } else {
        return <></>;
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
      <div>
        {allSelections}
        {repeatErr === true && (
          <p className="error">You cannot select the same skill more than once.</p>
        )}
      </div>
    );
  };

  renderAsi = () => {
    const allSelections = this.state.character.asi.map((asi, index) => {
      if (asi.variable === true) {
        return (
          <div>
            <label>
              Based on your <em className="depends_on">{asi.depends_on}</em>, choose one of the following:
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
      } else {
        return <></>;
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
    if(!this.state.character){
      return <div>loading...</div>
    }
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
      <div className="bodyarea">
        <h3>
          Choose your baseline ability scores:
        </h3>
        {standardArray}
        {allAsi && (<h3>
          Choose bonuses for your ability scores based on your previous selections:
        </h3>)}
        {allAsi}
        <h3>
          Choose bonus proficiencies for specific skills::
        </h3>
        {profs}
        <table>
          <tr className="firstrow">
            <th>Skill</th>
            <th>Base modifier</th>
            <th>Proficiency</th>
            <th>Total modifier</th>
          </tr>
          {allStats}
        </table>
      </div>
    );
  }
}

export default StatsScreen;
