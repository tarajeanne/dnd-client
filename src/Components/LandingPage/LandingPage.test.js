import React from 'react';
import LandingPage from './LandingPage';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('LandingPage', () => {
    it('renders as expected', () => {
        const wrapper = shallow(<LandingPage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
  });
