import React from 'react';
import StatItem from './StatItem';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('StatItem', () => {
    it('renders as expected', () => {
        const wrapper = shallow(<StatItem />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
  });
