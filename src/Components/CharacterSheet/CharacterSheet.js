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
        (check, index) => (
          <li key={index} className="skill_check">
            {skill_profs.includes(check) && (
              <span className="prof_dot character-sheet-span">&#8226;</span>
            )}
            {this.context.character.ability_checks[check].total}
          </li>
        )
      );
      const languages = this.context.character.languages.map(
        (language, index) =>
          index < this.context.character.languages.length - 1 ? (
            <li key={index} className="language">
              {language.name},{' '}
            </li>
          ) : (
            <li key={index} className="language">
              {language.name}
            </li>
          )
      );

      const skillsFeats = this.context.character.skills_and_features.map(
        (feat, index) => {
          if (feat.depends_on !== 'background' && feat.name !== 'Darkvision') {
            return (
              <p key={index} className="feat">
                {feat.name}: {feat.desc}
              </p>
            );
          }
        }
      );

      const otherProfs = this.context.character.other_prof.map(
        (prof, index) => {
          if (prof.name) {
            return (
              <p key={index} className="other-prof">
                {prof.name}: {prof.desc}
              </p>
            );
          } else {
            return <></>;
          }
        }
      );

      return (
        <div className="bodyarea">
          <p className="instructions">
            <em className="error">This page is optimized for use in Chrome.</em>{' '}
            To print your character sheet, right or command-click this page and
            select print. In the window that appears, click "more settings" and
            select the box called "background graphics." This ensures the
            background prints!
          </p>
          <div className="background-image">
            <span className="character-sheet-span" id="name">{this.context.character.name}</span>
            <span className="character-sheet-span" id="levelandclass">{this.context.character.class}</span>
            <span className="character-sheet-span" id="race">{this.context.character.race}</span>
            <span className="character-sheet-span" id="alignment">{this.context.character.alignment}</span>
            <span className="character-sheet-span" id="background">{this.context.character.background}</span>
            <span className="character-sheet-span" id="strengthtot">
              {this.context.character.abilities.strength.total}
            </span>
            <span className="character-sheet-span" id="strengthmod">
              {this.context.character.abilities.strength.mod}
            </span>
            <span className="character-sheet-span" id="dexteritytot">
              {this.context.character.abilities.dexterity.total}
            </span>
            <span className="character-sheet-span" id="dexteritymod">
              {this.context.character.abilities.dexterity.mod}
            </span>
            <span className="character-sheet-span" id="constitutiontot">
              {this.context.character.abilities.constitution.total}
            </span>
            <span className="character-sheet-span" id="constitutionmod">
              {this.context.character.abilities.constitution.mod}
            </span>
            <span className="character-sheet-span" id="intelligencetot">
              {this.context.character.abilities.intelligence.total}
            </span>
            <span className="character-sheet-span" id="intelligencemod">
              {this.context.character.abilities.intelligence.mod}
            </span>
            <span className="character-sheet-span" id="wisdomtot">
              {this.context.character.abilities.wisdom.total}
            </span>
            <span className="character-sheet-span" id="wisdommod">
              {this.context.character.abilities.wisdom.mod}
            </span>
            <span className="character-sheet-span" id="charismatot">
              {this.context.character.abilities.charisma.total}
            </span>
            <span className="character-sheet-span" id="charismamod">
              {this.context.character.abilities.charisma.mod}
            </span>
            <span className="character-sheet-span" id="prof_bonus">{this.context.character.prof_bonus}</span>
            <span className="character-sheet-span" id="max_hp">{this.context.character.hp}</span>
            <span className="character-sheet-span" id="speed">{this.context.character.speed}</span>
            {this.context.character.other_prof.filter(
              (prof) => prof.name === 'Darkvision'
            ) && <span className="character-sheet-span" id="vision">Dark</span>}
            <ul id="check_prof_list">{skill_list}</ul>
            <div className="profs_langs">
              <span className="language-title character-sheet-span">Languages:</span>
              <ul className="language-list">{languages}</ul>
              {otherProfs}
            </div>
            <div className="skills-feats">{skillsFeats}</div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default CharacterSheet;
