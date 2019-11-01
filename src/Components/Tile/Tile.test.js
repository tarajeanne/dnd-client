import React from 'react';
import Tile from './Tile';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Tile', () => {
  it('renders as expected', () => {
    const item = {
      id: 1,
      name: 'Dwarf',
      desc:
        'Proud warriors and miners from the mountains who value culture and tradition.',
      asi: [
        {
          name: 'Constitution',
          variable: false,
          depends_on: 'race',
          magnitude: 2
        }
      ],
      age:
        'Physically mature in their 20s, but not socially adults until 50. They live about 350 years.',
      alignment:
        'Believing in order, justice, and fair play, dwarves tend toward lawful good.',
      size: 'Medium',
      size_desc: 'Between 4 and 5 feet tall, averaging 150 lbs.',
      speed: 25,
      languages: [
        {
          name: 'Dwarvish',
          variable: false,
          depends_on: 'race'
        }
      ],
      weap_prof: [
        {
          weapid: 15,
          variable: false,
          depends_on: 'race'
        },
        {
          weapid: 21,
          variable: false,
          depends_on: 'race'
        },
        {
          weapid: 4,
          variable: false,
          depends_on: 'race'
        },
        {
          weapid: 6,
          variable: false,
          depends_on: 'race'
        }
      ],
      other_prof: [
        {
          name: '',
          variable: true,
          depends_on: 'race',
          options: ["smith's tools", "brewer's supplies", "mason's tools"]
        },
        {
          name: 'Stonecunning',
          desc:
            'Whenever you make a History check related to stonework, add double your proficiency bonus to the check.',
          depends_on: 'race',
          variable: false
        },
        {
          name: 'Dwarven Resilience',
          desc:
            'You have advantage on saving throws against poison, and you have resistance against poison damage',
          variable: false,
          depends_on: 'race'
        }
      ],
      skills_and_features: [
        {
          name: 'Darkvision',
          desc:
            'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.',
          variable: false,
          depends_on: 'race'
        }
      ],
      subraces: [
        {
          name: 'Hill Dwarf',
          slug: 'hill-dwarf',
          desc:
            'As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.',
          asi: {
            Wisdom: 1
          },
          asi_desc: 'Ability Score Increase. Your Wisdom score increases by 1',
          document_slug: 'systems-reference-document'
        }
      ]
    };
    const wrapper = shallow(<Tile item={item} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
