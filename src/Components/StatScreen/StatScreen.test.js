import React from 'react';
import StatsScreen from './StatsScreen';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('StatsScreen', () => {
  it('renders as expected', () => {
    const match = {
      path: 'http://localhost:3000/character/cjzc2ny7q0000fep28oy727gq/stats'
    };
    const wrapper = shallow(<StatsScreen match={match} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
