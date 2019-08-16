import React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('App', () => {
    it('renders as expected', () => {
        const wrapper = shallow(<App />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
  })