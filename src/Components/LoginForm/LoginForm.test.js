import React from 'react';
import LoginForm from './LoginForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('LoginForm', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<LoginForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
