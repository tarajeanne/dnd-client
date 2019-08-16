import React from 'react';
import RegistrationForm from './RegistrationForm';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('RegistrationForm', () => {
    it('renders as expected', () => {
        const wrapper = shallow(<RegistrationForm />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
  });
