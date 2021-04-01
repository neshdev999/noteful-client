import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Note from './Note';
// import { parseISO } from 'date-fns'; 

describe(`Note component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date('2019-01-03T00:00:00.000Z'),
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