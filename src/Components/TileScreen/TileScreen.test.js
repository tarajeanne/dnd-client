import React from 'react';
import TileScreen from './TileScreen';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('TileScreen', () => {
    it('renders as expected', () => {
      const match = { path: 'http://localhost:3000/character/cjzc2ny7q0000fep28oy727gq/race'}
        const wrapper = shallow(<TileScreen match={match}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
  });
