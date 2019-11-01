import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Header', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
