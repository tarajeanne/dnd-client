import React from 'react';
import CreatorNav from './CreatorNav';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Nav', () => {
  it('renders as expected', () => {
    const context = {
      character: {
        name: 'Sabrill',
        ac: 0,
        race: '',
        class: '',
        physical_desc: '',
        other_desc: '',
        background: '',
        alignment: '',
        size: '',
        speed: 0,
        languages: [
          {
            name: 'Language: Common',
            variable: false,
            depends_on: null
          }
        ],
        other_prof: [],
        asi: [],
        tool_prof: [],
        weap_prof: [],
        save_prof: [],
        check_prof: [],
        armor_prof: [],
        skills_and_features: [],
        prof_bonus: 2,
        hitDice: '',
        hp: 0,
        abilities: {
          constitution: {
            base: 0,
            total: 0,
            mod: 0
          },
          strength: {
            base: 0,
            total: 0,
            mod: 0
          },
          dexterity: {
            base: 0,
            total: 0,
            mod: 0
          },
          charisma: {
            base: 0,
            total: 0,
            mod: 0
          },
          intelligence: {
            base: 0,
            total: 0,
            mod: 0
          },
          wisdom: {
            base: 0,
            total: 0,
            mod: 0
          }
        },
        ability_checks: {
          acrobatics: {
            mod: 0,
            prof: 0,
            total: 0
          },
          'animal handling': {
            mod: 0,
            prof: 0,
            total: 0
          },
          arcana: {
            mod: 0,
            prof: 0,
            total: 0
          },
          athletics: {
            mod: 0,
            prof: 0,
            total: 0
          },
          deception: {
            mod: 0,
            prof: 0,
            total: 0
          },
          history: {
            mod: 0,
            prof: 0,
            total: 0
          },
          insight: {
            mod: 0,
            prof: 0,
            total: 0
          },
          intimidation: {
            mod: 0,
            prof: 0,
            total: 0
          },
          investigation: {
            mod: 0,
            prof: 0,
            total: 0
          },
          medicine: {
            mod: 0,
            prof: 0,
            total: 0
          },
          nature: {
            mod: 0,
            prof: 0,
            total: 0
          },
          perception: {
            mod: 0,
            prof: 0,
            total: 0
          },
          performance: {
            mod: 0,
            prof: 0,
            total: 0
          },
          persuasion: {
            mod: 0,
            prof: 0,
            total: 0
          },
          religion: {
            mod: 0,
            prof: 0,
            total: 0
          },
          'sleight of hand': {
            mod: 0,
            prof: 0,
            total: 0
          },
          stealth: {
            mod: 0,
            prof: 0,
            total: 0
          },
          survival: {
            mod: 0,
            prof: 0,
            total: 0
          }
        },
        weapons: [],
        armor: [],
        equipment: [],
        spells_known: [],
        spell_slots: [],
        spells_memorized: []
      }
    };
    const match = {
      path: 'http://localhost:3000/character/cjzc2ny7q0000fep28oy727gq/stats'
    };
    const wrapper = shallow(<CreatorNav match={match} />, { context });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
