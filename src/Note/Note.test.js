import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Note from './Note';
import { parseISO } from 'date-fns' 

describe(`Note component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(parseISO(15,1,2019)),
  }

  it('renders a .Note by default', () => {
    const wrapper = shallow(<Note />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('renders the Note given props', () => {
    const wrapper = shallow(<Note {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
});