import React from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import './CharacterSheet.css';

class CharacterSheet extends React.Component {
  static contextType = CharacterContext;
  render() {
    if (this.context.character) {
      const skill_profs = this.context.character.check_prof.map(
        (prof) => prof.name
      );
      const skill_list = Object.keys(this.context.character.ability_checks).map(
        (check) => (
          <li className="skill_check">
            {skill_profs.includes(check) && (
              <span className="prof_dot">&#8226;</span>
            )}
            {this.context.character.ability_checks[check].total}
          </li>
        )
      );
      const languages = this.context.character.languages.map((language, index) =>
        index < this.context.character.languages.length - 1 ? (
          <li className="language">{language.name}, </li>
        ) : (
          <li className="language">{language.name}</li>
        )
      );
  
      const skillsFeats = this.context.character.skills_and_features.map(feat => {
        if(feat.depends_on !== 'background' && feat.name !=='Darkvision'){
          return <p className="feat">{feat.name}: {feat.desc}</p>
        };
      })
  
      const otherProfs = this.context.character.other_prof.map((prof) => {
        if (prof.name) {
          return (
            <p className="other-prof">
              {prof.name}: {prof.desc}
            </p>
          );
        } else {
          return <></>
        }
      });
  
      return (
        <div className="background-image">
          <span id="name">{this.context.character.name}</span>
          <span id="levelandclass">{this.context.character.class}</span>
          <span id="race">{this.context.character.race}</span>
          <span id="alignment">{this.context.character.alignment}</span>
          <span id="background">{this.context.character.background}</span>
          <span id="strengthtot">
            {this.context.character.abilities.strength.total}
          </span>
          <span id="strengthmod">
            {this.context.character.abilities.strength.mod}
          </span>
          <span id="dexteritytot">
            {this.context.character.abilities.dexterity.total}
          </span>
          <span id="dexteritymod">
            {this.context.character.abilities.dexterity.mod}
          </span>
          <span id="constitutiontot">
            {this.context.character.abilities.constitution.total}
          </span>
          <span id="constitutionmod">
            {this.context.character.abilities.constitution.mod}
          </span>
          <span id="intelligencetot">
            {this.context.character.abilities.intelligence.total}
          </span>
          <span id="intelligencemod">
            {this.context.character.abilities.intelligence.mod}
          </span>
          <span id="wisdomtot">
            {this.context.character.abilities.wisdom.total}
          </span>
          <span id="wisdommod">
            {this.context.character.abilities.wisdom.mod}
          </span>
          <span id="charismatot">
            {this.context.character.abilities.charisma.total}
          </span>
          <span id="charismamod">
            {this.context.character.abilities.charisma.mod}
          </span>
          <span id="prof_bonus">{this.context.character.prof_bonus}</span>
          <span id="max_hp">{this.context.character.hp}</span>
          <span id="speed">{this.context.character.speed}</span>
          {this.context.character.other_prof.filter(prof=>prof.name==='Darkvision') && <span id="vision">Dark</span>}
          <ul id="check_prof_list">{skill_list}</ul>
          <div className="profs_langs">
            <span className="language-title">Languages:</span>
            <ul className="language-list">{languages}</ul>
            {otherProfs}
          </div>
          <div className="skills-feats">
            {skillsFeats}
        </div>
        </div>
        
      );
    }
    else {
      return <></>
    }

  }
}

export default CharacterSheet;
